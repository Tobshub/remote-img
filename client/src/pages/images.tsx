import { serverUrl } from "@/data/url";
import { trpc } from "@/utils/trpc";
import { Link } from "react-router-dom";

export default function ImagesPage() {
  const imgRefs = trpc.retrieve.getAll.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextcursor }
  );

  if (!imgRefs.data) {
    return <>Loading...</>;
  }
  return (
    <div className="page">
      <Link to="/" className="btn btn-primary rounded-0">
        HOME
      </Link>
      <h1 className="text-center">All Images</h1>
      <ul
        className="navbar-nav flex-row flex-wrap justify-content-center gap-2 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        {imgRefs.data?.pages.map((page) =>
          page.value.map((imageRef) => (
            <DisplayImageComponent serverUrl={serverUrl} imageRef={imageRef} />
          ))
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
