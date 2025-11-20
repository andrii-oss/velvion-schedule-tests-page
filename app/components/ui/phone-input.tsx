"use client";

import * as React from "react";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Country } from "react-phone-number-input";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils";
import { getTimezone, TimezoneName } from "countries-and-timezones";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      // Use a consistent default for SSR to prevent hydration mismatch
      const [defaultCountry, setDefaultCountry] = React.useState<Country>("GB");
      const [selectedCountry, setSelectedCountry] = React.useState<
        RPNInput.Country | undefined
      >("GB");

      // Only detect timezone on client after hydration
      React.useEffect(() => {
        try {
          const browserTimezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
          const timezoneDataCountry = getTimezone(
            browserTimezone as TimezoneName
          );
          const detectedCountry = ((timezoneDataCountry
            ?.countries?.[0] as Country) || "GB") as Country;
          setDefaultCountry(detectedCountry);
          setSelectedCountry(detectedCountry);
        } catch {
          // Fallback to GB if timezone detection fails
          setDefaultCountry("GB");
          setSelectedCountry("GB");
        }
      }, []);

      return (
        <RPNInput.default
          ref={ref}
          className={cn("group flex w-full ", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={true}
          defaultCountry={selectedCountry || defaultCountry}
          onCountryChange={(country) => {
            if (setSelectedCountry && country) {
              setSelectedCountry(country);
            }
          }}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <div className="border-b border-[#7E7E7E] w-full ml-1">
    <Input
      // dir={use18nCustomProvider()?.direction === "rtl" ? "rtl" : "ltr"}
      className={cn(
        "h-full text-[16px] placeholder:text-[16px] bg-transparent px-1 border-none outline-none shadow-none w-full pb-[6px] placeholder:text-[#CCCCCC]",
        className
      )}
      {...props}
      ref={ref}
    />
  </div>
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="border-b border-[#7E7E7E]">
          <Button
            type="button"
            variant="ghost"
            className="flex gap-1 p-1 h-full border-none cursor-pointer"
            disabled={disabled}
          >
            <FlagComponent
              country={selectedCountry}
              countryName={selectedCountry}
            />
            {open ? (
              <ChevronUp style={{ width: "14px", height: "14px", opacity: 0.6 }} />
            ) : (
              <ChevronDown style={{ width: "14px", height: "14px", opacity: 0.6 }} />
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-[#f9f9f7]">
        <Command>
          <CommandInput placeholder="Search country" />
          <CommandList>
            <CommandEmpty>No country found</CommandEmpty>
            <ScrollArea className="h-72">
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2 cursor-pointer hover:bg-gray-200" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-transparent [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
