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
      <ul className="navbar-nav flex-row flex-wrap justify-content-center gap-2 mx-auto" style={{maxWidth: 1200}}>
        {imgRefs.data?.pages.map((page) =>
          page.value.map((ref) => (
            <li key={ref.url} className="mb-2">
              <img src={`${serverUrl}/img/${ref.url}`} height={250} />
            </li>
          ))
        ) ?? null}
      </ul>
    </div>
  );
}
