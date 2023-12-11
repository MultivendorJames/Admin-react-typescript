import { useState } from "react";
import Loader from "../../common/Loader";
import { get } from "../../utils/apiClient";
import { useQuery } from "react-query";

interface category {
  date: string;
  name: string;
  slug: string;
  __v: string;
  _id: string;
}

interface user {
  balance: 0;
  email: string;
  name: string;
  role: string;
}

interface variation {
  variants: string[];
}
interface productData {
  category: category;

  data: string;
  description: string;
  image: string;
  metaDescription: string;
  metaTitle: string;
  mrpPrice: string;
  name: string;
  price: string;
  quantity: number;
  sku: string;
  slug: string;
  unit: string;
  user: user;
  weight: number;
  views: number;
  variation: variation;
  _id: string;
}

const filter_data = [
  { label: "Filter by Price", value: "price" },
  { label: "Filter by Category", value: "category" },
];
export default function Products() {
  const [isEnteredValue, setIsEnteredItem] = useState<string>("");
   const [enteredDropDownValue, setEnteredDropDownValue] = useState<string>("");
  const getProducts = () => {
    const res = get("/products");
    return res;
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setIsEnteredItem(value);

    console.log(isEnteredValue);
    
  };

  const { data, isLoading, isError } = useQuery("products", getProducts);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  

  return (
    <div>
      <form className="flex items-center gap-4 mb-2 bg-white p-6 rounded-md" action="">
        <div>
          <select
            className="px-5 py-2 rounded-md border bg-transparent border-brandColor outline-none  focus:ring-brandColor focus:ring-1"
            
            onChange={(e)=> {setEnteredDropDownValue(e.target.value)
            console.log(enteredDropDownValue);
            
            }}
            value={enteredDropDownValue}
          >
            {filter_data.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="w-[50%]">
          <input
            value={isEnteredValue}
            onChange={handleOnchange}
            className="px-4 py-2 w-full  border outline-none bg-transparent border-brandColor focus:ring-brandColor focus:ring-1 rounded-md"
            type="text"
            name=""
            id=""
            placeholder="Search products"
          />
        </div>
      </form>
      <div>
        {data.data.filter((product)=> {
          return isEnteredValue.toLowerCase() === "" ? product : product.name.toLowerCase().includes(isEnteredValue) 
        }).map((item: productData) => (
          <div
            key={item._id}
            className="bg-white dark:bg-boxdark border border-brandColor rounded-md  my-4 p-5"
          >
            <div className="mb-2">
              <h5 className="text-lg font-semibold">Name: {item.name}</h5>
            </div>

            <div className="mb-2">
              <h5> Category: {item.category.name}</h5>
            </div>
            <div className="mb-2">
              <h5>Quatity: {item.quantity}</h5>
            </div>
            <div className="mb-2">
              <h5>Price: ${item.price}</h5>
            </div>
            <div className="mb-2">
              <h5>SKU: {item.sku}</h5>
            </div>
            <div className="mb-2">
              <h5 className="mb-2">Seller Email: {item.user.email}</h5>
              <h5>Seller Name: {item.user.name}</h5>
            </div>
            <div className="my-7">
              <p>
                <b className="text-lg">Description:</b> {item.description}
              </p>
            </div>
            <div className="mb-5">
              <img
                className="w-[200px] rounded-md border-2 border-brandColor p-"
                src={item.image}
                alt=""
              />
            </div>
            <div className="mb-2">
              <p>Varition:</p>
            </div>
            <div className="mb-2">
              <h5>Views: {item.views}</h5>
            </div>
            <div className="mb-2">
              <h5>weight: {item.weight}</h5>
            </div>
          </div>
        ))}

        {data && data.data.length === 0 && <p>No data found!</p> }
      </div>
    </div>
  );
}
