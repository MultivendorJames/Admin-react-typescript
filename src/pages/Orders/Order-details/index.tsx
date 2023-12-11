import { useParams } from "react-router-dom";
import { get, put } from "../../../utils/apiClient";
import { characterLimit } from "../../../utils/charaterLimit";

import { useQuery } from "react-query";
import Loader from "../../../common/Loader";
import { toast } from "react-toastify";
import { useState } from "react";

interface seller {
  email: string;
  name: string;
  _id: string;
}
interface productData {
  name: string;
  quantity: number;
  price: number;
  status: string;
  _id: string;
  image: string;
  seller: seller;
}
export default function orderDetails() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const param = useParams();

  const { id } = param;

  const getOrder = () => {
    const res = get(`/orders/${id}`);

    return res;
  };

  const { data, isLoading: orderDetailsIsLoading } = useQuery(
    "singeOrder",
    getOrder
  );

  const handleUpdateStatus = async (_id: string) => {
    setIsLoading(true);

    await put(`/orders/${id}/status`, {
      productId: _id,
      status: "shipped",
    })
      .then((res) => {
        setIsLoading(false);
        if (res.success === true) {
          toast.success("Order Updated!");
        }
      })

      .catch((error) => {
        setIsLoading(false);
        toast.error((error as any).response.data.error);
      });

    setIsLoading(false);
  };

  if (orderDetailsIsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="bg-white dark:bg-boxdark p-5 rounded-md">
        <div className="mb-5 ">
          <h1 className="font-semibold mb-5 text-2xl">📦 ORDER DETAILS</h1>
          <h6 className="mb-2">Payment method: {data?.paymentMethod}</h6>
          {/* <h6 className="mb-2">Payment id: {data?.paymentId}</h6> */}
          <h6 className="mb-2">Order id: {data?.orderId}</h6>
          <h6>Total Amount: ${data?.total}</h6>
        </div>
        <hr className="my-2 broder border-[#cccccc7a]" />

        <div className="mb-5  ">
          <h2 className="font-semibold text-xl mb-3">🚚 Delivery Address:</h2>
          <p className="mb-2">{data.deliveryAddress.address}</p>
          <p className="mb-2">{data.deliveryAddress.city}</p>
          <p className="mb-2">{data.deliveryAddress.country}</p>
          <p className="mb-2">{data.deliveryAddress.phone}</p>
          <p className="mb-2">{data.deliveryAddress.postalCode}</p>
          <p className="mb-2">{data.deliveryAddress.state}</p>
          <p>{data.deliveryAddress.email}</p>
        </div>
        <hr className="my-2 broder border-[#cccccc7a]" />

        <div className="">
          <h3 className="text-2xl font-semibold">Items In this Order:</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {data?.products.map((item: productData) => (
            <div
              key={item._id}
              className=" rounded-md dark:bg-boxdark  gap-3  my-4 px-1  py-6"
            >
              <div className="mb-5">
                <img className=" w-full   " src={item.image} alt="" />
              </div>

              <div className="p-0">
                <div className="mb-2">
                  {/* <h5 className="text-lg ">Name: characterLimit(`${item.name}`, 5) </h5> */}
                </div>
                <div className="mb-2">
                  <h5
                    className={` { ${
                      item.status === "received"
                        ? "text-success"
                        : "text-danger"
                    }  `}
                  >
                    {" "}
                    Status: {item.status}
                  </h5>
                </div>
                <div className="mb-2">
                  <h5>Quatity: {item.quantity}</h5>
                </div>
                <div className="mb-2">
                  <h5>Price: ${item.price}</h5>
                </div>

                <div className="mb-3">
                  <h5 className="mb-2">Seller Email: {item.seller.email}</h5>
                  <h5>Seller Name: {item.seller.name}</h5>
                </div>
                {item.status === "Processing" && (
                  <button
                    onClick={() => handleUpdateStatus(item._id)}
                    className="bg-brandColor px-3 py-2 text-white rounded-md"
                  >
                    {!isLoading ? " Order Shipped" : "Updating..."}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
