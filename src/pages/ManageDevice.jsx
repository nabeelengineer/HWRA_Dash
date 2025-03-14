import { useState } from "react";

const ManageDevice = () => {
    const [deviceId, setDeviceId] = useState("");
    const [deviceData, setDeviceData] = useState(null);
    const [formData, setFormData] = useState({
        NOCNumber: "",
        Userkey: "",
        CompanyName: "",
        Latitude: "",
        Longitude: "",
        Platform: "EES",
    });

    const addDevice = async () => {
        try {
            const response = await fetch("https://apis.enggenv.com/forwarders/hwra/addDeviceInfo/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ info: formData }),
            });
            const data = await response.json();
            if (data.deviceId) {
                setDeviceId(data.deviceId);
                alert(`Device Added Successfully: ${data.deviceId}`);
                await syncDevice(data.deviceId); // Auto-sync after adding
            } else {
                alert("Failed to add device");
            }
        } catch (error) {
            console.error("Error adding device:", error);
        }
    };

    const syncDevice = async (id) => {
        const syncId = id || deviceId;
        if (!syncId) return alert("Enter Device ID to Sync");
        try {
            await fetch("https://apis.enggenv.com/forwarders/hwra/sync/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device_id: syncId }),
            });
            alert(`Device ${syncId} Synced Successfully!`);
        } catch (error) {
            console.error("Error syncing device:", error);
        }
    };

    const getDeviceInfo = async () => {
        if (!deviceId) return alert("Enter Device ID to Fetch Info");
        try {
            const response = await fetch(`https://apis.enggenv.com/forwarders/hwra/getDeviceInfo/${deviceId}`);
            const data = await response.json();
            if (data && data.info) {
                setDeviceData(data);
                setFormData(data.info);
            }
        } catch (error) {
            console.error("Error fetching device info:", error);
        }
    };

    const updateDeviceInfo = async () => {
        if (!deviceId) return alert("Device ID is required for updating");
        try {
            const response = await fetch(`https://apis.enggenv.com/forwarders/hwra/editDeviceInfo/${deviceId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    info: formData,
                    startDate: deviceData?.startDate,
                    LastSync: deviceData?.LastSync,
                    status: "Active",
                }),
            });
            if (response.ok) {
                alert("Device Info Updated Successfully!");
            } else {
                alert("Failed to update device");
            }
        } catch (error) {
            console.error("Error updating device info:", error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Manage Device</h2>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData).map((key) => (
                    <input
                        key={key}
                        type="text"
                        placeholder={key}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                ))}
            </div>

            {/* Add Device (Auto Sync after Adding) */}
            <button
                className="mt-4 bg-gradient-to-r from-orange-500 to-black text-white py-2 px-4 rounded"
                onClick={addDevice}
            >
                Add Device
            </button>

            {/* Sync Device (Separate Option) */}
            <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Sync Device</h3>
                <input
                    type="text"
                    placeholder="Enter Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    className="border p-2 rounded w-full mt-2"
                />
                <button
                    className="mt-2 bg-gradient-to-r from-orange-500 to-black text-white py-2 px-4 rounded"
                    onClick={() => syncDevice()}
                >
                    Sync Device
                </button>
            </div>

            {/* Fetch Device Info */}
            <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Device Info</h3>
                <button
                    className="mt-2 bg-gradient-to-r from-orange-500 to-black text-white py-2 px-4 rounded"
                    onClick={getDeviceInfo}
                >
                    Get Device Info
                </button>

                {/* Show Device Data */}
                {deviceData && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <pre className="text-sm">{JSON.stringify(deviceData, null, 2)}</pre>
                    </div>
                )}
            </div>

            {/* Edit Device Info (Always Visible if Device ID is Entered) */}
            {deviceId && (
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold">Edit Device Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(formData).map((key) => (
                            <input
                                key={key}
                                type="text"
                                placeholder={key}
                                value={formData[key]}
                                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                className="border p-2 rounded w-full"
                            />
                        ))}
                    </div>
                    <button
                        className="mt-4 bg-gradient-to-r from-orange-500 to-black text-white py-2 px-4 rounded"
                        onClick={updateDeviceInfo}
                    >
                        Update Device
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageDevice;
