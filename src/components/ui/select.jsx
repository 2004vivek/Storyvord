import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === 'SelectTrigger') {
          return React.cloneElement(child, {
            onClick: () => setOpen(!open),
            'aria-expanded': open
          });
        }

        if (child.type.displayName === 'SelectContent') {
          return open ? React.cloneElement(child, {
            onClose: () => setOpen(false),
            value,
            onValueChange: (val) => {
              onValueChange?.(val);
              setOpen(false);
            }
          }) : null;
        }

        return child;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(({ className, children, placeholder, ...props }, ref) => (
  <span ref={ref} className={cn("block truncate", className)} {...props}>
    {children || placeholder}
  </span>
));
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(({ className, children, onClose, value, onValueChange, ...props }, ref) => {
  return (
    <div className="absolute z-50 w-full mt-1 top-full left-0">
      <div
        ref={ref}
        className={cn(
          "overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md max-h-60",
          className
        )}
        {...props}
      >
        <div className="p-1">
          {React.Children.map(children, (child) => {
            if (child.type.displayName === 'SelectItem') {
              return React.cloneElement(child, {
                selected: child.props.value === value,
                onClick: () => onValueChange?.(child.props.value)
              });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      {
        "bg-accent text-accent-foreground": selected
      },
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {selected && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
    <span className="truncate">{children}</span>
  </div>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };