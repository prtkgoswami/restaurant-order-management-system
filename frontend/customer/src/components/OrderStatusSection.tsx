import { OrderStatus } from "../types/order";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const OrderCompleteView = ({ lastUpdatedAt }: { lastUpdatedAt?: Date }) => {
  return (
    <section className="h-full w-full grow flex flex-col md:gap-2 justify-center items-center py-6">
      <h2 className="text-4xl font-semibold text-amber-500">Order Complete</h2>
      <div className="flex flex-col gap-3 items-center h-[230px] md:h-[320px] w-80% md:w-[60%]">
        <DotLottieReact
          src="/pizza-box-order.json"
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h4 className="text-xl">Ready for Pickup</h4>
        {lastUpdatedAt && (
          <p className="text-sm text-zinc-400">
            Last Updated At: {new Date(lastUpdatedAt).toLocaleString()}
          </p>
        )}
      </div>
    </section>
  );
};

const OrderStatusSection = ({
  currentStatus,
  lastUpdatedAt,
}: {
  currentStatus: (typeof OrderStatus)[number];
  lastUpdatedAt?: Date;
}) => {
  const filteredStatues = OrderStatus.slice(0, OrderStatus.length - 1);
  const currentIndex = OrderStatus.indexOf(currentStatus);
  if (currentStatus === "COMPLETED") {
    return <OrderCompleteView lastUpdatedAt={lastUpdatedAt} />;
  }
  return (
    <section className="h-full w-full grow flex flex-col gap-8 justify-center items-center py-6">
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-2xl md:text-3xl font-light uppercase">
          Order Status
        </h2>
        {lastUpdatedAt && (
          <p className="text-xs md:text-sm text-zinc-400">
            Last Updated At: {new Date(lastUpdatedAt).toLocaleString()}
          </p>
        )}
      </div>
      <ul className="list-none md:list-disc list-inside flex flex-row justify-between md:justify-start md:flex-col w-[80%] md:w-max">
        {filteredStatues.map((status, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div key={status}>
              {i > 0 && (
                <div
                  className={`hidden md:block h-16 border border-dashed border-zinc-200 ${
                    isComplete ? "border-green-400!" : ""
                  } ${isCurrent ? "border-amber-500!" : ""} w-max ml-1.5`}
                />
              )}
              <li
                className={`font-semibold text-xl md:text-2xl text-zinc-100 ${
                  isComplete ? "text-green-400!" : ""
                } ${isCurrent ? "text-amber-500!" : ""}`}
              >
                {status}
              </li>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default OrderStatusSection;
