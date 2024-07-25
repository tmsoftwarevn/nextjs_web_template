import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {

  // fetch data
  const res = await fetch(
    `${process.env.URL_BACKEND}/api/v1/detail_template/${params.slug}`
  );
  const result = await res.json();
  if (result && result.EC === 1) {
    return {
      title: result?.data.title,
      description: result?.data.meta_des,
      openGraph: {
        images: `${process.env.URL_BACKEND}/images/${result?.data.image}`,
      },
    };
  }


}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>

      {children}


    </div>
  )
}
