import React from 'react';
export function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 300,
    ...props
  }: {
    value: any ;
    onChange: (value: any) => void;
    debounce?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue);
  
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }