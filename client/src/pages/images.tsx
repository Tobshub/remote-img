import { serverUrl } from "@/data/url";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ImagesPage() {
  const imgRefs = trpc.retrieve.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextcursor }
  );

  const [imageFilter, setImageFilter] = useState("");

  if (!imgRefs.data) {
    return <>Loading...</>;
  }
  return (
    <div className="page">
      <Link to="/" className="btn btn-primary rounded-0">
        HOME
      </Link>
      <h1 className="text-center">All Images</h1>
      <form style={{ maxWidth: 500 }} className="mx-auto">
        <label>filter images:</label>
        <input
          placeholder="filter query"
          className="form-control"
          onChange={(e) => setImageFilter(e.target.value)}
        />
      </form>
      <ul
        className="navbar-nav flex-row flex-wrap justify-content-center gap-2 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        {imgRefs.data?.pages.map((page) =>
          page.value
            .filter((imageRef) => imageRef.name.includes(imageFilter))
            .map((imageRef) => <DisplayImageComponent serverUrl={serverUrl} imageRef={imageRef} />)
        ) ?? null}
      </ul>
    </div>
  );
}

function DisplayImageComponent(props: {
  imageRef: { url: string; name: string };
  serverUrl: string;
}) {
  return (
    <li className="mb-2">
      <a target="_blank" href={`${props.serverUrl}/img/${props.imageRef.url}`}>
        <img src={`${props.serverUrl}/img/${props.imageRef.url}`} height={250} />
      </a>
    </li>
  );
}
