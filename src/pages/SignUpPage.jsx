import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Card, Typography, DatePicker, message, Upload } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { UploadOutlined, CameraOutlined  } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"; 

const { Title } = Typography;


const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);

  const videoRef = useRef(null);
  const signaturePad = useRef();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      const values = form.getFieldsValue(true); // Get all form values at the current step
      console.log("🔹 Saving Form Values at Step", currentStep, values);
  
      await form.validateFields(); // Validate before moving forward
      form.setFieldsValue(values); // Ensure values persist across steps
  
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("❌ Validation failed:", error);
    }
  };
  

  

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSignup = async () => {
    try {
      const values = form.getFieldsValue(true); // Get all form values again before submitting
  
      console.log("🚀 Final Form Values Before Submit:", values);
    
      if (!values.name || !values.email) {
        console.error("🚨 ERROR: Required values missing! Check Form.Item `name` attributes.");
        message.error("Please fill in all required fields before submitting.");
        return;
      }
  
      const payload = {
        name: values.name || "",
        user_name: values.email?.split("@")[0] || "",
        password: values.password || "",
        dob: values.dob ? values.dob.format("DD-MM-YYYY") : "",
        mobile_no: values.mobile || "",
        nominee_name: values.nominee_name || "",
        nominee_dob: values.nominee_dob ? values.nominee_dob.format("DD-MM-YYYY") : "",
        nominee_relation: values.nominee_relation || "",
        email: values.email || "",
        mobileno: "9898989898",
        address: values.address || "",
        addressproofno: values.aadharNumber || "",
        gender: values.gender || "",
        panno: values.panNumber || "",
        city: values.city || "",
        landmark: values.landmark || "",
        state: values.state || "",
        pincode: values.pincode || "",
        idproof: "Aadhar",
        addressproof: "Aadhar",
        signature: signature || "",
        picture: selfie || "",
      };
  
      console.log("📦 Final Payload Being Sent:", JSON.stringify(payload, null, 2));
      setLoading(true);
  
      const response = await fetch("/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const responseText = await response.text();
      console.log("📢 Server Raw Response:", responseText);
  
      const jsonStartIndex = responseText.indexOf("{");
      if (jsonStartIndex !== -1) {
        const validJson = responseText.slice(jsonStartIndex);
        const data = JSON.parse(validJson);
        message.success(data.message || "Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error("Invalid JSON response from server.");
      }
    } catch (error) {
      console.error("❌ An error occurred:", error);
      message.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const clearSignature = () => {
    signaturePad.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    if (!signaturePad.current.isEmpty()) {
      const base64Signature = signaturePad.current.getTrimmedCanvas().toDataURL("image/png");
      setSignature(base64Signature);
      message.success("Signature saved!");
    } else {
      message.error("Please draw your signature!");
    }
  };
  

  const openCamera = async () => {
    try {
      console.log("Opening camera...");
  
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Use the front camera
      });
  
      setStream(mediaStream); // Save stream to state
      setCameraActive(true); // Force re-render to show video
  
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        } else {
          console.error("Video ref not assigned yet.");
        }
      }, 100); // Small delay to ensure video element is ready
  
    } catch (error) {
      console.error("Camera Access Error:", error);
      message.error("Camera access denied. Please allow camera permissions.");
    }
  };
  
  
  
  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("Video or canvas ref not available.");
      return;
    }
  
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    const selfieData = canvas.toDataURL("image/png"); // Convert to Base64
    setSelfie(selfieData);
  
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
    message.success("Selfie captured successfully!");
  };
  
  
  
  

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);
  useEffect(() => {
    console.log(`🔍 Step Changed to: ${currentStep}`);
    console.log("📋 Current Form Values:", form.getFieldsValue(true));
}, [currentStep]);


  return (
    <div style={styles.container}>
      <Card style={styles.card} bordered={true}>
        <Title level={2} style={styles.title}>
          Create an Account
        </Title>
    <Form layout="vertical" form={form} onFinish={handleSignup} style={styles.form}>
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: "Please select your date of birth!" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select your date of birth" />
              </Form.Item>
              
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select your gender!" }]}
              >
                <Input placeholder="Enter your gender (e.g., Male, Female, Other)" />
              </Form.Item>
              <Button type="primary" shape="round" block onClick={handleNext}>
                Next
              </Button>
            </>
          )}

          {/* Step 2: Contact Details */}
         {/* Step 2: Contact & Nominee Details */}
{currentStep === 2 && (
  <>
    <Form.Item
      label="Mobile"
      name="mobile"
      rules={[
        { required: true, message: "Please enter your mobile number!" },
        { pattern: /^\d{10}$/, message: "Mobile number must be 10 digits!" },
      ]}
    >
      <Input placeholder="Enter your mobile number" />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: "Please enter your email!" },
        { type: "email", message: "Please enter a valid email address!" },
      ]}
    >
      <Input placeholder="Enter your email id" />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please enter your password!" }]}
    >
      <Input.Password placeholder="Enter your password" />
    </Form.Item>

    {/* Nominee Fields */}
    <Form.Item
      label="Nominee Name"
      name="nominee_name"
      rules={[{ required: true, message: "Please enter nominee name!" }]}
    >
      <Input placeholder="Enter nominee's name" />
    </Form.Item>

    <Form.Item
      label="Nominee Date of Birth"
      name="nominee_dob"
      rules={[{ required: true, message: "Please select nominee's DOB!" }]}
    >
      <DatePicker style={{ width: "100%" }} placeholder="Select nominee's date of birth" />
    </Form.Item>

    <Form.Item
      label="Nominee Relation"
      name="nominee_relation"
      rules={[{ required: true, message: "Please enter nominee relation!" }]}
    >
      <Input placeholder="Enter relation with nominee" />
    </Form.Item>

    <div style={styles.buttonRow}>
      <Button type="default" shape="round" onClick={handlePrev}>
        Previous
      </Button>
      <Button type="primary" shape="round" onClick={handleNext}>
        Next
      </Button>
    </div>
  </>
)}


          {/* Step 3: Address Details Part 1 */}
          {currentStep === 3 && (
            <>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter your address!" }]}
              >
                <Input placeholder="Enter your address" />
              </Form.Item>
              <Form.Item
                label="Street"
                name="street"
                rules={[{ required: true, message: "Please enter your street!" }]}
              >
                <Input placeholder="Enter your street" />
              </Form.Item>
              <Form.Item
                label="Landmark"
                name="landmark"
                rules={[{ required: true, message: "Please enter a landmark!" }]}
              >
                <Input placeholder="Enter landmark" />
              </Form.Item>
              <div style={styles.buttonRow}>
                <Button type="default" shape="round" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="primary" shape="round" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Address Details Part 2 */}
          {currentStep === 4 && (
            <>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city!" }]}
              >
                <Input placeholder="Enter your city" />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please enter your state!" }]}
              >
                <Input placeholder="Enter your state" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter your country!" }]}
              >
                <Input placeholder="Enter your country" />
              </Form.Item>
              <Form.Item
                label="Pincode"
                name="pincode"
                rules={[
                  { required: true, message: "Please enter your pincode!" },
                  { pattern: /^\d{6}$/, message: "Pincode must be 6 digits!" },
                ]}
              >
                <Input placeholder="Enter your pincode" />
              </Form.Item>
              <div style={styles.buttonRow}>
                <Button type="default" shape="round" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="primary" shape="round" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </>
          )}

          {/* Step 5: Aadhaar and PAN Details */}
          {currentStep === 5 && (
            <>
              <Form.Item
                label="Enter Aadhaar Number"
                name="aadharNumber"
                rules={[
                  { required: true, message: "Please enter your Aadhaar number!" },
                  { pattern: /^\d{12}$/, message: "Aadhaar number must be 12 digits!" },
                ]}
              >
                <Input placeholder="Enter your Aadhaar number" />
              </Form.Item>
              <Form.Item
                label="Upload Aadhaar"
                name="aadharUpload"
                rules={[{ required: true, message: "Please upload your Aadhaar!" }]}
              >
                <Upload
                  name="aadhar"
                  listType="text"
                  beforeUpload={() => false}
                  accept=".jpg,.png,.pdf"
                >
                  <Button style={{padding:"10px 30px"}} icon={<UploadOutlined />}></Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Enter PAN Number"
                name="panNumber"
                rules={[
                  { required: true, message: "Please enter your PAN number!" },
                  { pattern: /^[A-Z]{5}\d{4}[A-Z]{1}$/, message: "Invalid PAN number format!" },
                ]}
              >
                <Input placeholder="Enter your PAN number" />
              </Form.Item>
              <Form.Item
                label="Upload PAN"
                name="panUpload"
                rules={[{ required: true, message: "Please upload your PAN!" }]}
              >
                <Upload
                  name="pan"
                  listType="text"
                  beforeUpload={() => false}
                  accept=".jpg,.png,.pdf"
                >
                  <Button style={{padding:"10px 30px"}} icon={<UploadOutlined />}></Button>
                </Upload>
              </Form.Item>
              
              <div style={styles.buttonRow}>
                <Button type="default" shape="round" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="primary" shape="round" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </>
          )}
        {/* Step 6: Digital Signature and Selfie Capture */}
          {currentStep === 6 && (
            <>
              <Form.Item label="Draw Your Signature">
                <div style={styles.signatureContainer}>
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
                    ref={signaturePad}
                  />
                </div>
                <div style={styles.buttonRow}>
                  <Button onClick={clearSignature} style={{ marginRight: "10px" }}>
                    Clear
                  </Button>
                  <Button type="primary" onClick={saveSignature}>
                    Save Signature
                  </Button>
                </div>
              </Form.Item>

              <Form.Item label="Capture Selfie">
  {!cameraActive ? (
    <>
      <Button type="primary" icon={<CameraOutlined />} onClick={openCamera}>
        Open Camera
      </Button>
      {selfie && (
        <img
          src={selfie}
          alt="Selfie Preview"
          style={{ marginTop: "10px", maxWidth: "100%", height: "auto" }}
        />
      )}
    </>
  ) : (
    <div style={styles.cameraContainer}>
      {/* Ensure the video element is only rendered when the camera is active */}
      {cameraActive && <video ref={videoRef} autoPlay playsInline />}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Button type="primary" onClick={captureSelfie} style={{ marginTop: "10px" }}>
        Capture Selfie
      </Button>
    </div>
  )}
</Form.Item>



              <div style={styles.buttonRow}>
                <Button type="default" shape="round" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="primary" shape="round" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eff4fb",
  },
  card: {
    width: 500,
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    marginTop: "10px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  signatureContainer: {
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  cameraContainer: {
    textAlign: "center",
  },
  video: {
    width: "100%",
    maxHeight: "300px",
  },
};


export default SignupPage;
