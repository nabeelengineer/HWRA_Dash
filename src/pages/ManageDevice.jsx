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

    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingSync, setLoadingSync] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    // Add Device
    const addDevice = async () => {
        if (!deviceId.trim()) {
            alert("Device ID is required to add a device.");
            return;
        }

        setLoadingAdd(true);
        try {
            const response = await fetch(`https://apis.enggenv.com/forwarders/hwra/addDeviceInfo/${deviceId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ info: formData, platform: formData.Platform }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Device ${deviceId} Added Successfully!`);
                setDeviceId("");
                setFormData({
                    NOCNumber: "",
                    Userkey: "",
                    CompanyName: "",
                    Latitude: "",
                    Longitude: "",
                    Platform: "EES",
                });
            } else {
                alert(`Failed to add device: ${data.message}`);
            }
        } catch (error) {
            console.error("Error adding device:", error);
            alert("Error adding device. Check console for details.");
        } finally {
            setLoadingAdd(false);
        }
    };

    // Sync Device
    const syncDevice = async () => {
        if (!deviceId.trim()) {
            alert("Device ID is required for syncing.");
            return;
        }
        setLoadingSync(true);
        try {
            await fetch("https://apis.enggenv.com/forwarders/hwra/sync/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device_id: deviceId }),
            });
            alert(`Device ${deviceId} Synced Successfully!`);
        } catch (error) {
            console.error("Error syncing device:", error);
        } finally {
            setLoadingSync(false);
        }
    };

    // Get Device Info
    const getDeviceInfo = async () => {
        if (!deviceId.trim()) {
            alert("Device ID is required to fetch device info.");
            return;
        }
        setLoadingFetch(true);
        try {
            const response = await fetch(`https://apis.enggenv.com/forwarders/hwra/getDeviceInfo/${deviceId}`);
            const data = await response.json();
            if (data && data.info) {
                setDeviceData(data);
                setFormData(data.info);
            } else {
                alert("No device info found.");
            }
        } catch (error) {
            console.error("Error fetching device info:", error);
        } finally {
            setLoadingFetch(false);
        }
    };

    // Update Device Info
    const updateDeviceInfo = async () => {
        if (!deviceId.trim()) {
            alert("Device ID is required to update device info.");
            return;
        }
        setLoadingUpdate(true);
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
                alert("Failed to update device.");
            }
        } catch (error) {
            console.error("Error updating device info:", error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Manage Device</h2>

            {/* Device ID Input */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Device ID:</label>
                <input
                    type="text"
                    placeholder="Enter Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Add Device Section */}
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Add Device</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData).map((key) =>
                        key === "Platform" ? (
                            <div key={key}>
                                <label className="block mb-1 font-medium">{key}:</label>
                                <input
                                    type="text"
                                    value={formData[key]}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        ) : (
                            <div key={key}>
                                <label className="block mb-1 font-medium">{key}:</label>
                                <input
                                    type="text"
                                    placeholder={`Enter ${key}`}
                                    value={formData[key]}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        )
                    )}
                </div>
                <button
                    className="mt-4 bg-gradient-to-r from-orange-500 to-black text-black hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                    onClick={addDevice}
                    disabled={loadingAdd}
                >
                    {loadingAdd ? "Adding Device..." : "Add Device"}
                </button>
            </div>

            {/* Sync Device */}
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Sync Device</h3>
                <button
                    className="mt-2 bg-gradient-to-r from-orange-500 to-black text-black hover:bg-orange-600 text-white py-2 px-4 rounded w-full"
                    onClick={syncDevice}
                    disabled={loadingSync}
                >
                    {loadingSync ? "Syncing..." : "Sync Device"}
                </button>
            </div>

            {/* Get Device Info */}
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Get Device Info</h3>
                <button
                    className="mt-2 bg-gradient-to-r from-orange-500 to-black text-black hover:bg-green-700 text-white py-2 px-4 rounded w-full"
                    onClick={getDeviceInfo}
                    disabled={loadingFetch}
                >
                    {loadingFetch ? "Fetching..." : "Get Device Info"}
                </button>
                {deviceData && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <pre className="text-sm">{JSON.stringify(deviceData, null, 2)}</pre>
                    </div>
                )}
            </div>

            {/* Update Device Info */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Update Device Info</h3>
                <button
                    className="mt-2 bg-gradient-to-r from-orange-500 to-black text-black hover:bg-purple-700 text-white py-2 px-4 rounded w-full"
                    onClick={updateDeviceInfo}
                    disabled={loadingUpdate}
                >
                    {loadingUpdate ? "Updating..." : "Update Device"}
                </button>
            </div>
        </div>
    );
};

export default ManageDevice;
