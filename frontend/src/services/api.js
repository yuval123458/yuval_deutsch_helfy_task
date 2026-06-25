

const BASE_URL = 'http://localhost:4000/api/tasks';

export async function getTasks() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('failed to fetch tasks');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  export async function createTask(task) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('failed to create task');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export async function updateTask(id, task) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('failed to update task');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  export async function deleteTask(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('failed to delete task');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export async function toggleTask(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}/toggle`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('failed to toggle task');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }