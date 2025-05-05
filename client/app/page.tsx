import FileUpload from "./components/file-upload";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className=" min-h-screen w-[30vw] flex flex-col items-center justify-center border-r-2 bg-slate-950 text-white">
          <FileUpload />

        </div>
        <div className=" min-h-screen w-[70vw]  border-l-2"> chat</div>
      </div>
    </div>
  );
}
