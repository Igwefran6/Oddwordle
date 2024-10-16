import Button from "./Button";

function Settings({ settingsVisible }: { settingsVisible: boolean }) {
  return (
    <div
      className={
        `absolute w-64 top-24 right-6 bg-slate-800 p-4 text-white transition-all ` +
        (settingsVisible ? "translate-y-0" : "translate-y-[100svh]")
      }
    >
      <div>LETTER COUNT</div>
      <div>DIFFICULTY</div>
      <div>SOUND</div>
      <div>RESET GAME</div>
      <div className="mt-4">
        <Button onClick={() => {}} label="SAVE" />
      </div>
    </div>
  );
}

export default Settings;
