"use client";

export default function Error({ reset }) {
  return <main className="page"><h1>Something went wrong.</h1><button className="button" onClick={() => reset()}>Try again</button></main>;
}
