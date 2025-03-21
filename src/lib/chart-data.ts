type Todo = {
    id: string
    text: string
    completed: boolean
  }
  
  export function generateMockHistoricalData(todos: Todo[]) {
    const today = new Date()
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
    // Generate data for the last 7 days
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (6 - i))
      const dayName = days[date.getDay()]
  
      // Simulate random completed and added tasks with some correlation to current state
      const completed = Math.floor(Math.random() * (todos.length > 10 ? 5 : 3))
      const added = Math.floor(Math.random() * 5) + (i === 6 ? todos.length / 3 : 0)
  
      return {
        day: dayName,
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        completed,
        added,
        active: todos.length - completed,
      }
    })
  }
  
  