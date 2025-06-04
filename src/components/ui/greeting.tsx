export function GreetUser({ name }: { name: string }) {
  return (
    <div className="mb-6 p-4">
      <h1 className="font-bold text-3xl text-muted-foreground">
        <span className="mr-1">👋</span> {(() => {
          const hour = new Date().getHours();

          if (hour < 12) {
            return "Good morning";
          }
          if (hour < 18) {
            return "Good afternoon";
          }
          return "Good evening";
        })()}, {name}!
      </h1>
    </div>
  );
}
