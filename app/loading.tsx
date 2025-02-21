import Spinner from "./_components/Spinner";

function Loading() {
  return <Spinner />;
}
// Behind the scenes the loading component automatically activates the streaming
// Behind the scenes instead of using React.renderToString Next.js uses renderToReadableStream. This feature needs JavaScript enabled on the browser, so if the user has JS disabled streaming will not work. So if we want our app to be accessible to users with JS disabled you can not have any loading.tsx file in our app.
// We can also use Suspense to allow streaming for individual components
// If we use a loading component even if only 1 of 20 components in the page is fetching data whole page will not be rendered until every component has fetched the data, and user will see a loading screen until all the data is fetched
export default Loading;
