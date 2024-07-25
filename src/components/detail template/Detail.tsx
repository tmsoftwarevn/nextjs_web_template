
const Detail = ({detail}: any) => {
    return (
        <div className="mt-10">
            <div className="font-bold text-blue-600 text-xl border-b-2 border-gray-200 mb-5">
                MÔ TẢ
            </div>
            <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        </div>
    );
}

export default Detail;