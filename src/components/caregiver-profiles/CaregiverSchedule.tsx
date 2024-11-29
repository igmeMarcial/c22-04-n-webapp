import React from "react";

const data = {
    caregiverId: 1,
    availability: [
        { weekday: 1, start_time: "08:00", end_time: "10:00" },
        { weekday: 1, start_time: "11:00", end_time: "16:00" },
        { weekday: 2, start_time: "09:00", end_time: "15:00" },
        { weekday: 2, start_time: "16:00", end_time: "22:00" },
        { weekday: 3, start_time: "10:00", end_time: "18:00" },
        { weekday: 4, start_time: "12:00", end_time: "20:00" },
        { weekday: 5, start_time: "08:00", end_time: "14:00" },
        { weekday: 5, start_time: "15:00", end_time: "20:00" },
        { weekday: 6, start_time: "08:00", end_time: "12:00" },
        { weekday: 6, start_time: "13:00", end_time: "17:00" },
        { weekday: 6, start_time: "18:00", end_time: "22:00" },
        { weekday: 0, start_time: "10:00", end_time: "14:00" },
        { weekday: 0, start_time: "15:00", end_time: "19:00" },
    ]
};

const formatTime = (dateTime: string): string => {
    const date = new Date(dateTime); // Crea un objeto Date
    let hours = date.getUTCHours(); // Obtén las horas en UTC
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Obtén los minutos en UTC
    const period = hours >= 12 ? "PM" : "AM"; // Determina si es AM o PM
    hours = hours % 12 || 12; // Convierte la hora a formato 12 horas, ajustando las 0 horas a 12
    return `${hours}:${minutes} ${period}`; // Devuelve la hora formateada como HH:mm AM/PM
};


const weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];

interface Availability {
    weekday: number;
    start_time: string;
    end_time: string;
}

interface CaregiverScheduleProps {
    availability: Availability[];
}
const CaregiverSchedule: React.FC<CaregiverScheduleProps> = ({ availability }) => {
    // Agrupa los horarios por día de la semana
    const groupedAvailability = availability.reduce((acc: any, slot) => {
        acc[slot.weekday] = acc[slot.weekday] || [];
        acc[slot.weekday].push(slot);
        return acc;
    }, {});

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="space-y-4">
                {Object.entries(groupedAvailability).map(([weekday, slots]: any) => (
                    <div key={weekday} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-600">
                            {weekdays[parseInt(weekday)]}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {slots.map((slot: any, index: number) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-md"
                                >
                                    {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaregiverSchedule;
