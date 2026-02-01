import "./App.css";
import KotRail from "./KotRail";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="pt-3 pb-1">
        <h2 className="text-2xl text-center font-light">Pizza Express - KOT Rail</h2>
      </header>
      <main className="grow">
        <div className="md:hidden h-full flex flex-col gap-4 justify-center items-center px-5">
          <h2 className="text-2xl leading-relaxed text-center">
            This page is not available on Mobile Devices.
          </h2>
          <p className="text-zinc-300">Please use a Desktop or Monitor.</p>
        </div>
        <div className="hidden md:block h-full">
          <KotRail />
        </div>
      </main>
    </div>
  );
}

export default App;
