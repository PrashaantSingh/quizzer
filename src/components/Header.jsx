import { NavLink } from "react-router";
export default function Header() {
  return (
    <>
      <div className="text-white flex w-[80%] justify-between mb-4 px-2 items-center mx-auto py-6">
        <div>
          <h1 className="text-2xl text-amber-500 font-semibold">Quizzer</h1>
        </div>
        <div>
          <NavLink to="/results" className='border-2 border-amber-500 text-amber-500 px-2 py-.5 rounded-full'>Results</NavLink>
        </div>
      </div>
    </>
  );
}
