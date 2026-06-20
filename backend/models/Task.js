const { pool } = require('../config/database');

// In-memory fallback storage when database is not available
let inMemoryTasks = [];
let nextTaskId = 1;
let dbAvailable = false;

class TaskModel {
  static async createTasksTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      )
    `;
    
    try {
      const connection = await pool.getConnection();
      await connection.query(query);
      connection.release();
      dbAvailable = true;
      console.log('✓ Tasks table created/verified');
      return true;
    } catch (error) {
      console.error('✗ Database not available, using in-memory storage:', error.message);
      dbAvailable = false;
      return false;
    }
  }

  static async getAllTasks() {
    if (!dbAvailable) {
      // Return in-memory tasks sorted by created_at descending
      return inMemoryTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM tasks ORDER BY created_at DESC');
      connection.release();
      return rows;
    } catch (error) {
      // Fallback to in-memory if database connection fails
      console.warn('Database query failed, using in-memory storage');
      return inMemoryTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }

  static async getTaskById(id) {
    if (!dbAvailable) {
      return inMemoryTasks.find(t => t.id === parseInt(id)) || null;
    }
    
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      return inMemoryTasks.find(t => t.id === parseInt(id)) || null;
    }
  }

  static async getTasksByStatus(status) {
    if (!dbAvailable) {
      return inMemoryTasks
        .filter(t => t.status === status)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC', [status]);
      connection.release();
      return rows;
    } catch (error) {
      return inMemoryTasks
        .filter(t => t.status === status)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  }

  static async createTask(title, description, status = 'Pending') {
    if (!dbAvailable) {
      const task = {
        id: nextTaskId++,
        title,
        description,
        status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      inMemoryTasks.push(task);
      return task;
    }
    
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
      connection.release();
      return { id: result.insertId, title, description, status };
    } catch (error) {
      // Fallback to in-memory storage
      const task = {
        id: nextTaskId++,
        title,
        description,
        status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      inMemoryTasks.push(task);
      return task;
    }
  }

  static async updateTaskStatus(id, status) {
    if (!dbAvailable) {
      const task = inMemoryTasks.find(t => t.id === parseInt(id));
      if (task) {
        task.status = status;
        task.updated_at = new Date().toISOString();
        return { id: task.id, status };
      }
      return null;
    }
    
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
      connection.release();
      
      if (result.affectedRows === 0) {
        return null;
      }
      return { id, status };
    } catch (error) {
      // Fallback to in-memory storage
      const task = inMemoryTasks.find(t => t.id === parseInt(id));
      if (task) {
        task.status = status;
        task.updated_at = new Date().toISOString();
        return { id: task.id, status };
      }
      return null;
    }
  }

  static async deleteTask(id) {
    if (!dbAvailable) {
      const index = inMemoryTasks.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        inMemoryTasks.splice(index, 1);
        return { id: parseInt(id), deleted: true };
      }
      return null;
    }
    
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('DELETE FROM tasks WHERE id = ?', [id]);
      connection.release();
      
      if (result.affectedRows === 0) {
        return null;
      }
      return { id, deleted: true };
    } catch (error) {
      // Fallback to in-memory storage
      const index = inMemoryTasks.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        inMemoryTasks.splice(index, 1);
        return { id: parseInt(id), deleted: true };
      }
      return null;
    }
  }
}

module.exports = TaskModel;
