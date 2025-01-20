import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";

export const LandingEnd = () => {
  return (
    <section>
      <div className="text-center border-t mt-12">
        <h1 className="text-4xl mt-12 mb-2">Ready to Experience SendFlow</h1>
        <p className="text-lg mt-2   mb-4">
          Join thousands of users who trust SendFlow for their daily
          transactions.
          <br /> Start sending money instantly today.
        </p>
        <Button className="mb-10">
          Get Started Now{" "}
          <span>
            <MoveRight />
          </span>
        </Button>
      </div>
    </section>
  );
};
