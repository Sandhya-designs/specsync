import React from 'react';

export const FormGroup = ({ label, error, children }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    {children}
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export const TextInput = React.forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="input"
  />
));

TextInput.displayName = 'TextInput';

export const TextArea = React.forwardRef((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    className="input resize-vertical"
  />
));

TextArea.displayName = 'TextArea';

export const Select = React.forwardRef(({ options, ...props }, ref) => (
  <select
    {...props}
    ref={ref}
    className="input"
  >
    <option value="">Select...</option>
    {options?.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
));

Select.displayName = 'Select';

export const CheckboxGroup = ({ label, options, value, onChange }) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    {options?.map((opt) => (
      <label key={opt.value} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value?.includes(opt.value)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...value, opt.value]);
            } else {
              onChange(value.filter((v) => v !== opt.value));
            }
          }}
          className="rounded border-gray-300"
        />
        <span className="text-sm text-gray-700">{opt.label}</span>
      </label>
    ))}
  </div>
);
