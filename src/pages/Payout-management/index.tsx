import { useState } from "react";
import Loader from "../../common/Loader";
import { get, put } from "../../utils/apiClient";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface user {
  email: string;
  _id: string;
  name: string;
}
interface payoutData {
  _id: string;
  amount: number;
  paymentMethod: string;
  status: string;
  user: user;
  createdAt: string;
}

const statusValues = [
  { label: "Completed", value: "completed" },
  { label: "Cancel", value: "cancelled" },
];
export default function Payout() {
  const [isDropDownActive, setDropDownActive] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getPayouts = () => {
    const res = get("/payouts/all");
    return res;
  };

  const {
    data,
    isLoading: dataIsLoading,
    isError,
  } = useQuery("payout", getPayouts);

  const handleToggleDropdown = (_id: string) => {
    setDropDownActive((prev) =>
      prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
    );
  };

  if (dataIsLoading) {
    return <Loader />;
  }

  if (isError) {
    console.log("something went wrong");
  }

  console.log(data);

  return (
    <div>
      <div>
        {data.map((item: payoutData) => (
          <div
            key={item._id}
            className="bg-white dark:bg-boxdark  rounded-md  mb-4  py-4 px-5"
          >
            <div className="mb-7">
              <div className="mb-3">
                <h5 className="text-lg font-semibold">Bal: ${item.amount}</h5>
              </div>
              <div className="mb-3">
                <h5 className="text-lg font-semibold">
                  Payment method: {item.paymentMethod}
                </h5>
              </div>

              <div className="mb-3">
                <h5
                  className={` ${
                    item.status === "cancelled" || item.status === "pending"
                      ? "text-danger"
                      : "text-success"
                  } text-lg `}
                >
                  Status: {item.status}
                </h5>
              </div>

              <div className="mb-2">
                <p className="text-lg ">Email: {item.user.email} </p>
              </div>
              <div>
                <div className="mb-7">
                  <p className="text-lg ">
                    Payout Requested at: {item.createdAt}{" "}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleToggleDropdown(item._id)}
                  className=" text-white bg-brandColor px-5 py-2 rounded-md"
                >
                  Update payment status
                </button>

                {isDropDownActive.includes(item._id) && (
                  <div className=" mt-4">
                    {statusValues.map((status, i) => (
                      <div key={i} className="">
                        <button
                          onClick={async () => {
                            setIsLoading(true);
                            console.log(i);

                            try {
                              const res = await put(
                                `/payouts/${item._id}/status`,
                                {
                                  status: `${status.value}`,
                                }
                              );
                              setIsLoading(false);

                              console.log(res);
                            } catch (error) {
                              setIsLoading(false);
                              console.log(error);

                              toast.error((error as any).response.data.error);
                            }
                          }}
                          className="bg-brandColor px-5 py-1 mb-2 rounded-md text-white"
                        >
                          {status.label}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {data && data.length === 0 && (
          <div>
            <p className="text-brandColor italic">No Payout request found !</p>
          </div>
        )}
      </div>
    </div>
  );
}
