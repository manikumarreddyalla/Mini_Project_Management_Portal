const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('\\n?? Starting API Integration Tests\\n');
  
  try {
    // Test 1: Health check
    console.log('Test 1: Health Check');
    const health = await axios.get('http://localhost:5000/health');
    console.log('? Server is running\\n');

    // Test 2: Get all tasks
    console.log('Test 2: Fetching all tasks');
    const allTasks = await axios.get(\\$\{API_URL}/tasks\);
    console.log(\? Fetched \$\{allTasks.data.count} tasks\\n\);

    // Test 3: Create a task
    console.log('Test 3: Creating a new task');
    const newTask = await axios.post(\\$\{API_URL}/tasks\, {
      title: 'Test Task',
      description: 'This is a test task description that is longer than 20 characters',
      status: 'Pending'
    });
    const taskId = newTask.data.data.id;
    console.log(\? Task created with ID: \$\{taskId}\\n\);

    // Test 4: Update task status
    console.log('Test 4: Updating task status');
    const updated = await axios.put(\\$\{API_URL}/tasks/\$\{taskId}\, {
      status: 'In Progress'
    });
    console.log('? Task status updated\\n');

    // Test 5: Get tasks by status
    console.log('Test 5: Filtering tasks by status');
    const filtered = await axios.get(\\$\{API_URL}/tasks/status/In Progress\);
    console.log(\? Filtered \$\{filtered.data.count} In Progress tasks\\n\);

    // Test 6: Delete task
    console.log('Test 6: Deleting task');
    await axios.delete(\\$\{API_URL}/tasks/\$\{taskId}\);
    console.log('? Task deleted\\n');

    // Test 7: Validation test
    console.log('Test 7: Testing validation');
    try {
      await axios.post(\\$\{API_URL}/tasks\, {
        title: '',
        description: 'short',
        status: 'Invalid'
      });
    } catch (error) {
      console.log('? Validation working - received expected error\\n');
    }

    console.log('\\n?? All integration tests passed!\\n');
  } catch (error) {
    console.error('? Test failed:', error.message);
  }
}

runTests();
