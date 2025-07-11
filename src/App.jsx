import { useState } from "react";
import { Button } from "./components/ui/button";
import ThemeToggle from "./components/ThemeToggle";
import AppLayout from "./layout/AppLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppLayout>
      <section className="flex flex-col items-center justify-center min-h-screen bg-light-background dark:bg-dark-background font-sora transition-colors duration-300">
        <ThemeToggle />
        <h1 className="text-4xl font-bold mb-4">Welcome to My Todo List</h1>
        <p className="text-lg mb-4">Count: {count}</p>
        <Button
          className="px-4 py-2 cursor-pointer bg-light-accent text-light-accent-text dark:bg-dark-accent dark:text-dark-accent-text rounded hover:bg-blue-600 transition"
          onClick={() => setCount(count + 1)}
        >
          Increment Count
        </Button>
      </section>
    </AppLayout>
  );
}

export default App;
