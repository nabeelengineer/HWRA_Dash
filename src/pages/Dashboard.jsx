import { useState, useEffect } from "react";

const DeviceDashboard = () => {
    const [devices, setDevices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const devicesPerPage = 10;

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await fetch("https://apis.enggenv.com/forwarders/hwra/getAllDeviceInfo");
            const data = await response.json();
            setDevices(data);
        } catch (error) {
            console.error("Error fetching devices:", error);
        }
    };

    const filteredDevices = devices.filter((device) =>
        device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.info.CompanyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastDevice = currentPage * devicesPerPage;
    const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
    const currentDevices = filteredDevices.slice(indexOfFirstDevice, indexOfLastDevice);
    const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
            {/* Header with Dashboard Title and Search Bar */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">📊 Device Dashboard</h2>
                <input
                    type="text"
                    placeholder="🔍 Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-64"
                />
            </div>

            {/* Device Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 py-2">S. No.</th>
                            <th className="border px-4 py-2">Device ID</th>
                            <th className="border px-4 py-2">Company Name</th>
                            <th className="border px-4 py-2">NOC Number</th>
                            <th className="border px-4 py-2">User Key</th>
                            <th className="border px-4 py-2">Last Sync</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDevices.length > 0 ? (
                            currentDevices.map((device, index) => (
                                <tr key={device.deviceId} className="text-center">
                                    <td className="border px-4 py-2">{indexOfFirstDevice + index + 1}</td>
                                    <td className="border px-4 py-2">{device.deviceId}</td>
                                    <td className="border px-4 py-2">{device.info.CompanyName}</td>
                                    <td className="border px-4 py-2">{device.info.NOCNumber}</td>
                                    <td className="border px-4 py-2">{device.info.Userkey}</td>
                                    <td className="border px-4 py-2">{new Date(device.LastSync).toLocaleString()}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${device.status === "Active" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                        >
                                            {device.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    No devices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-black text-white rounded disabled:bg-gray-400"
                >
                    ◀ Previous
                </button>
                <span className="text-lg font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-black text-white rounded disabled:bg-gray-400"
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
};

export default DeviceDashboard;
