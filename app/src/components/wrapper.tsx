import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Wrapper = ({ children, className, ...props }: WrapperProps) => {
  return (
    <main className={cn(["w-full h-full px-6 pt-20", className])} {...props}>
      {children}
      <Toaster/>
    </main>
  );
};

export default Wrapper;
