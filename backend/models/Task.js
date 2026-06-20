const { pool } = require('../config/database');

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
      console.log('✓ Tasks table created/verified');
      return true;
    } catch (error) {
      console.error('✗ Error creating tasks table:', error.message);
      return false;
    }
  }

  static async getAllTasks() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM tasks ORDER BY created_at DESC');
      connection.release();
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch tasks: ' + error.message);
    }
  }

  static async getTaskById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw new Error('Failed to fetch task: ' + error.message);
    }
  }

  static async getTasksByStatus(status) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC', [status]);
      connection.release();
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch tasks by status: ' + error.message);
    }
  }

  static async createTask(title, description, status = 'Pending') {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
      connection.release();
      return { id: result.insertId, title, description, status };
    } catch (error) {
      throw new Error('Failed to create task: ' + error.message);
    }
  }

  static async updateTaskStatus(id, status) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
      connection.release();
      
      if (result.affectedRows === 0) {
        return null;
      }
      return { id, status };
    } catch (error) {
      throw new Error('Failed to update task: ' + error.message);
    }
  }

  static async deleteTask(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('DELETE FROM tasks WHERE id = ?', [id]);
      connection.release();
      
      if (result.affectedRows === 0) {
        return null;
      }
      return { id, deleted: true };
    } catch (error) {
      throw new Error('Failed to delete task: ' + error.message);
    }
  }
}

module.exports = TaskModel;
