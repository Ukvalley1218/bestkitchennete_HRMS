import { useState, useRef } from "react";
import { X, Upload, Download, CheckCircle, AlertCircle } from "lucide-react";

const UploadLeadsModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedLeads, setUploadedLeads] = useState([]);
  const fileInputRef = useRef(null);

  const requiredFields = [
    "Name",
    "Address",
    "Mobile No",
    "DOB",
    "Email ID",
    "Occupation",
    "No Of Family Members",
    "Reference",
    "Reference Name",
    "Reference Mobile No",
    "Site Address",
    "Home Type",
    "Condition",
    "Requirement",
    "Representative Name",
  ];

  const sampleData = [
    {
      Name: "John Smith",
      Address: "123 Main Street, Mumbai",
      "Mobile No": "9876543210",
      DOB: "1990-05-15",
      "Email ID": "john.smith@email.com",
      Occupation: "Engineer",
      "No Of Family Members": "4",
      Reference: "Friend",
      "Reference Name": "Mike Johnson",
      "Reference Mobile No": "9876543211",
      "Site Address": "456 Park Avenue, Mumbai",
      "Home Type": "Apartment",
      Condition: "New",
      Requirement: "Kitchen Renovation",
      "Representative Name": "Rahul Sharma",
    },
    {
      Name: "Sarah Patel",
      Address: "789 Lake View, Delhi",
      "Mobile No": "9876543212",
      DOB: "1985-08-20",
      "Email ID": "sarah.patel@email.com",
      Occupation: "Doctor",
      "No Of Family Members": "3",
      Reference: "Family",
      "Reference Name": "Priya Patel",
      "Reference Mobile No": "9876543213",
      "Site Address": "321 River Road, Delhi",
      "Home Type": "Villa",
      Condition: "Renovation",
      Requirement: "Full Interior",
      "Representative Name": "Anita Kumar",
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateCSV = (headers) => {
    const missingFields = requiredFields.filter(
      (field) => !headers.includes(field)
    );
    return missingFields;
  };

  const parseCSV = (text) => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return { headers: [], data: [] };

    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      return row;
    });

    return { headers, data };
  };

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!validTypes.includes(file.type) && !["csv", "xlsx"].includes(fileExtension)) {
      setUploadStatus("error");
      setErrorMessage("Invalid file type. Please upload a CSV or XLSX file.");
      return;
    }

    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const { headers, data } = parseCSV(text);
      const missingFields = validateCSV(headers);

      if (missingFields.length > 0) {
        setUploadStatus("error");
        setErrorMessage("Invalid file format. Please upload CSV using the sample template.");
        return;
      }

      setUploadStatus("success");
      setErrorMessage("");
      setUploadedLeads(data.slice(0, 5));
    };

    reader.onerror = () => {
      setUploadStatus("error");
      setErrorMessage("Error reading file. Please try again.");
    };

    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadSample = () => {
    const headers = requiredFields.join(",");
    const sampleRows = sampleData
      .map((row) =>
        requiredFields.map((field) => `"${row[field] || ""}"`).join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${sampleRows}`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "campaign_leads_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setUploadStatus(null);
    setErrorMessage("");
    setUploadedFileName("");
    setUploadedLeads([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold text-[#1F2937]">Upload Campaign Leads</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-500">
            Upload a CSV file with the required fields. Only the sample format will be accepted.
          </p>

          {/* Upload Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Box */}
            <div>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-[#FF1E1E] bg-red-50"
                    : "border-gray-300 hover:border-[#FF1E1E] hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-3">
                    <Upload size={24} className="text-[#FF1E1E]" />
                  </div>

                  {uploadStatus === "success" ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={18} />
                      <span className="font-medium text-sm">{uploadedFileName}</span>
                    </div>
                  ) : uploadStatus === "error" ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle size={18} />
                      <span className="font-medium text-sm">Upload failed</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 font-medium mb-1">Drag and drop your file here</p>
                      <p className="text-gray-400 text-sm mb-3">or</p>
                    </>
                  )}

                  <button
                    onClick={handleButtonClick}
                    className="bg-[#FF1E1E] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Upload CSV File
                  </button>

                  <p className="text-xs text-gray-400 mt-2">Accepted formats: CSV, XLSX</p>
                </div>
              </div>

              {/* Status Messages */}
              {uploadStatus === "success" && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm text-green-700">CSV uploaded successfully. Leads imported.</span>
                  </div>
                  <button onClick={handleReset} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-600" />
                    <span className="text-sm text-red-700">{errorMessage}</span>
                  </div>
                  <button onClick={handleReset} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Download Sample & Required Fields */}
            <div>
              <button
                onClick={handleDownloadSample}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-[#FF1E1E] text-[#FF1E1E] rounded-lg text-sm font-medium hover:bg-red-50 transition-colors mb-5"
              >
                <Download size={18} />
                Download Sample CSV
              </button>

              <h3 className="text-sm font-semibold text-gray-700 mb-3">Required CSV Fields:</h3>
              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                {requiredFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-[#FF1E1E] rounded-full flex-shrink-0"></div>
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Table */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {uploadedLeads.length > 0 ? "Uploaded Leads Preview" : "Sample CSV Fields Preview"}
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Mobile No</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Occupation</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase">Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(uploadedLeads.length > 0 ? uploadedLeads : sampleData).map((lead, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-sm text-gray-700">{lead.Name}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-500 truncate max-w-[150px]">{lead.Address}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-500">{lead["Mobile No"]}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-500">{lead["Email ID"]}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-500">{lead.Occupation}</td>
                        <td className="px-4 py-2.5 text-sm text-gray-500">{lead.Requirement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Save Leads
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadLeadsModal;