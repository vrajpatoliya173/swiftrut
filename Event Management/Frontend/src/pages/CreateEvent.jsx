import React, {useState} from "react";
import axios from 'axios';

const CreateEvent = () => {

    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        type: "",
        image: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post("http://localhost:8008/api/v1/event/createEvent", formData);
          alert("Event created successfully!");
          console.log(response.data);
        } catch (error) {
          console.error("There was an error creating the event!", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Create New Event</h1>
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          {/* Event Name */}
          <div className="mb-4">
            <label
              htmlFor="event-name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Titel
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Event Date */}
          <div className="mb-4">
            <label
              htmlFor="event-date"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Event Type */}
          <div className="mb-4">
            <label
              htmlFor="event-type"
              className="block text-sm font-medium text-gray-700"
            >
              Event Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Enter your event eype"
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Event Location */}
          <div className="mb-4">
            <label
              htmlFor="event-location"
              className="block text-sm font-medium text-gray-700"
            >
              Event Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

           {/* Atendees */}

          <div className="mb-4">
            <label
              htmlFor="event-time"
              className="block text-sm font-medium text-gray-700"
            >
              Atendees:
            </label><br />

            <div className="mb-4">
            <label
              htmlFor="atendees-name"
              className="block text-sm font-medium text-gray-700"
            >
              Atendees Name
            </label>
                <input
                    type="text"
                    name="name"
                    // value={formData.attendees[0]}
                    onChange={handleChange}
                    placeholder="Enter atendees name in enent"
                    className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label
                htmlFor="atendees-email"
                className="block text-sm font-medium text-gray-700"
                >
                Atendees Email
                </label>
                <input
                    type="email"
                    name="email"
                    // value={formData.attendees[1]}
                    onChange={handleChange}
                    placeholder="Enter atendees email in enent"
                    className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label
                htmlFor="atendees-status"
                className="block text-sm font-medium text-gray-700"
                >
                Atendees Status
                </label>
                <select name="status" onChange={handleChange}>
                    <option disabled >-- Select status of atendees --</option>
                    <option value="Going">Going</option>
                    <option value="Maybe">Maybe</option>
                    <option value="Not Going">Not Going</option>
                </select>
            </div>
            
          </div>

          {/* Event Description */}
          <div className="mb-4">
            <label
              htmlFor="event-description"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your event"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500 h-32"
            />
          </div>

            <div className="mb-4">
                <label
                htmlFor="event-image"
                className="block text-sm font-medium text-gray-700"
                >
                Upload Image
                </label>
                <input
                    type="file"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    // placeholder="Enter atendees email in enent"
                    className="w-full mt-1 p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
