// CaregiverProfiles.tsx
import React, { useState, useEffect } from "react";
import CaregiverProfileList from "@/components/caregiver-profiles/CaregiverProfileList";
import CaregiverProfileForm from "@/components/caregiver-profiles/CaregiverProfileForm";


const CaregiverProfiles: React.FC = () => {


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Caregiver Profiles</h1>
            <CaregiverProfileForm
              userId="6c831357-6a7b-443b-a5d0-26d993647200" 
              />
            <div className="mt-6">
                <CaregiverProfileList/>
            </div>
        </div>
    );
};

export default CaregiverProfiles;
