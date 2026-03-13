import { useState, useRef } from "react";
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, X } from "lucide-react";

const MarketingLeadCSVUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', 'error'
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
    {
      Name: "Rahul Verma",
      Address: "567 Hill Road, Bangalore",
      "Mobile No": "9876543214",
      DOB: "1992-03-10",
      "Email ID": "rahul.verma@email.com",
      Occupation: "Business Owner",
      "No Of Family Members": "5",
      Reference: "Online",
      "Reference Name": "N/A",
      "Reference Mobile No": "N/A",
      "Site Address": "890 Tech Park, Bangalore",
      "Home Type": "Penthouse",
      Condition: "New",
      Requirement: "Modular Kitchen",
      "Representative Name": "Vikram Singh",
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
        setErrorMessage(
          `Invalid file format. Please upload CSV using the sample template.`
        );
        return;
      }

      setUploadStatus("success");
      setErrorMessage("");
      setUploadedLeads(data.slice(0, 5)); // Show first 5 rows as preview
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
    // Create CSV content
    const headers = requiredFields.join(",");
    const sampleRows = sampleData
      .map((row) =>
        requiredFields.map((field) => `"${row[field] || ""}"`).join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${sampleRows}`;

    // Create and download file
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

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1F2937]">Upload Campaign Leads</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload leads data for your marketing campaigns
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <Upload size={28} className="text-[#FF1E1E]" />
                </div>

                {uploadStatus === "success" ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={20} />
                    <span className="font-medium">{uploadedFileName}</span>
                  </div>
                ) : uploadStatus === "error" ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle size={20} />
                    <span className="font-medium">Upload failed</span>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 font-medium mb-2">
                      Drag and drop your file here
                    </p>
                    <p className="text-gray-400 text-sm mb-4">or</p>
                  </>
                )}

                <button
                  onClick={handleButtonClick}
                  className="bg-[#FF1E1E] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Upload CSV File
                </button>

                <p className="text-xs text-gray-400 mt-3">
                  Accepted formats: CSV, XLSX
                </p>
              </div>
            </div>

            {/* Helper Text */}
            <p className="text-sm text-gray-500 mt-3 text-center">
              Upload a CSV file with the required fields. Only the sample format will be accepted.
            </p>

            {/* Status Messages */}
            {uploadStatus === "success" && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-sm text-green-700">
                    CSV uploaded successfully. Leads imported.
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-600" />
                  <span className="text-sm text-red-700">{errorMessage}</span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Download Sample & Required Fields */}
          <div>
            {/* Download Sample Button */}
            <button
              onClick={handleDownloadSample}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#FF1E1E] text-[#FF1E1E] rounded-lg text-sm font-medium hover:bg-red-50 transition-colors mb-6"
            >
              <Download size={18} />
              Download Sample CSV
            </button>

            {/* Required Fields */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Required CSV Fields:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {requiredFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-[#FF1E1E] rounded-full"></div>
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Leads Preview */}
      {uploadedLeads.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">
              Sample CSV Fields Preview
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Showing first {uploadedLeads.length} records
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mobile No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Occupation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Requirement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {uploadedLeads.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{lead.Name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.Address}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead["Mobile No"]}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead["Email ID"]}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.Occupation}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.Requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sample CSV Fields Preview (when no file uploaded) */}
      {uploadedLeads.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">
              Sample CSV Fields Preview
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mobile No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Occupation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Requirement
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sampleData.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{lead.Name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.Address}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead["Mobile No"]}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead["Email ID"]}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.Occupation}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.Requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingLeadCSVUpload;