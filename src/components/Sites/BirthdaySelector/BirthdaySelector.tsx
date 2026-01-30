import { useRef, useState, useEffect } from "react";

import { gc } from "@/lib";
import { useVibrate } from "@/hooks";

function DateComponent({ date }: { date: string }) {
    return <p>{date}</p>;
}

function Button({ label, onClick }: { label: string; onClick: VoidFunction }) {
    const vibrator = useVibrate();
    function handleClick() {
        vibrator(100);
        onClick();
    }
    return (
        <button
            onClick={handleClick}
            className="solid text-md mb-1 h-fit w-fit min-w-15 cursor-pointer rounded-md border-2 border-zinc-600
                bg-zinc-300 p-1 active:shadow md:text-xl"
        >
            {label}
        </button>
    );
}

function DateSection({
    label,
    children,
    handleClick,
}: {
    label: string;
    children: React.ReactNode;
    handleClick: VoidFunction;
}) {
    return (
        <div className="flex h-65 w-full flex-col items-center justify-baseline md:h-85">
            <Button label={label} onClick={handleClick} />
            <ul className="overflow-hidden md:text-lg">{children}</ul>
        </div>
    );
}

function getDateString(_date: Date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = weekdays[_date.getDay()];
    const date = _date.getDate();
    const month = monthsShort[_date.getMonth()];
    const year = _date.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

function getRandDate(minDate: Date, maxDate: Date): Date {
    const min = minDate.getTime();
    const max = maxDate.getTime();
    return new Date(Math.floor(Math.random() * (max - min + 1)) + min); //inclusive of both
}

function useDateLogic(): [Date, (t: "earlier" | "later" | "reset") => void] {
    const minDate = useRef<Date>(new Date(1900, 0, 1));
    const maxDate = useRef<Date>(new Date());

    const [currDate, setCurrDate] = useState<Date>(new Date());

    useEffect(() => {
        setCurrDate(getRandDate(minDate.current, maxDate.current));
    }, []);

    function updateDates(birthDateIs: "earlier" | "later" | "reset") {
        // birthdate is higher or lower than randomly choosen date between mindate and maxdate

        switch (birthDateIs) {
            case "later": {
                //birthday is higher than random date
                minDate.current = currDate;
                break;
            }
            case "earlier": {
                //birthday is lower than random date
                maxDate.current = currDate;
                break;
            }
            case "reset": {
                minDate.current = new Date(1900, 0, 1);
                maxDate.current = new Date();
                setCurrDate(getRandDate(minDate.current, maxDate.current));
                break;
            }
        }

        setCurrDate(getRandDate(minDate.current, maxDate.current));
    }

    return [currDate, updateDates];
}

export default function BirthdaySelector() {
    const [guesses, setGuesses] = useState(1);

    const [currDate, updateDates] = useDateLogic();

    const [earlierDates, setEarlierDates] = useState<string[]>([]);
    const [laterDates, setLaterDates] = useState<string[]>([]);

    const earlierDateElms = earlierDates.map((d) => <DateComponent date={d} />);
    const laterDateElms = laterDates.map((d) => <DateComponent date={d} />);

    function updateEarlierDates() {
        updateDates("earlier");
        setEarlierDates((e) => [getDateString(currDate), ...e]);
        setGuesses((g) => g + 1);
    }
    function updateLaterDates() {
        updateDates("later");
        setLaterDates((e) => [getDateString(currDate), ...e]);
        setGuesses((g) => g + 1);
    }

    function handleReset() {
        setEarlierDates([]);
        setLaterDates([]);
        setGuesses(1);
        updateDates("reset");
    }

    function handleSubmit() {
        handleReset();
        setTimeout(() => {
            alert("yay!!!");
        });
    }

    return (
        <div className="h-full w-full bg-[hsl(0,0%,93%)]">
            <div
                className={gc(
                    `mx-auto flex h-full w-[70%] flex-col items-center justify-center font-mono text-gray-800
                    select-none md:w-[50%]`,
                )}
            >
                <h1 className={gc("mb-3 text-center font-mono text-2xl font-bold tracking-wider md:text-4xl")}>
                    Is this your birthday??
                </h1>
                {/*Current Date*/}
                <div className="mb-3 flex flex-col items-center text-center">
                    <p
                        className="rounded border-2 border-zinc-600 bg-zinc-300/70 p-1 text-2xl font-medium
                            tracking-wide"
                    >
                        {getDateString(currDate)}
                    </p>
                    <p className="mt-1 text-xl">Guesses {guesses}</p>
                </div>
                <section className={gc("grid w-full grid-cols-3 justify-items-center align-middle")}>
                    {/*Earlier dates*/}
                    <DateSection label="Earlier" handleClick={updateEarlierDates}>
                        {earlierDateElms}
                    </DateSection>
                    <div className="text-center">
                        <Button label="Yes" onClick={handleSubmit} />
                        <button onClick={handleReset} className="mx-auto block">
                            <p className="cursor-pointer hover:underline active:underline">reset</p>
                        </button>
                    </div>
                    {/*Later dates*/}
                    <DateSection label="Later" handleClick={updateLaterDates}>
                        {laterDateElms}
                    </DateSection>
                </section>
            </div>
        </div>
    );
}
