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

const weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];
// TODO: Cargar la data de base de datos
const CaregiverSchedule: React.FC = () => {
    // Agrupa los horarios por día de la semana
    const groupedAvailability = data.availability.reduce((acc: any, slot) => {
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
                                    {slot.start_time} - {slot.end_time}
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
