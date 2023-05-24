import { client } from "@/lib/datocms";

export async function getStaticProps() {
  const symptoms = await client.items.all({ 'filter[type]': 'symptom' });


  console.log(symptoms)
  return {
    props: {
      symptoms,
    },
  };
}

export default function MyPage({ symptoms }) {
  console.log(symptoms)
  console.log('symptoms')


  return (
    <div>test
      {/* {symptoms.map((article) => (
        <div key={article.id}>
          <h2>{article.name}</h2>
        </div>
      ))} */}
    </div>
  );
}