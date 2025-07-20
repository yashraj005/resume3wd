import React from "react";
import "./WhatWeServe.css";

const WhatWeServe = () => {
  return (
    <div className="what-we-serve-container">
      {/* ERP Section */}
      <div className="erp">
        <img src="/whatwedo.png" alt="ERP Concept" />
        <div>
          <h4>Transforming Business Operations with Cutting-Edge ERP Solutions</h4><hr />
          <h4>3WD Software delivers smart, scalable ERP systems tailored for the sugar industry.</h4><hr />
          <h4>Our tools streamline processes, enhance data accuracy, and boost productivity.</h4><hr />
          <h4>From web-based ERP to mobile apps, we simplify complex operations for modern enterprises.</h4><hr />
        </div>
        <img src="/erpss.png" alt="ERP Dashboard" />
      </div>

      {/* Mobile Applications Section */}
      <section className="section">
        <h2>📱 Mobile Applications</h2>
        <p>
          We offer Android and iOS applications tailored for the sugar industry.
          Apps like <strong>Chitboy</strong> and <strong>Sugar 24x7</strong> empower field workers with real-time data.
        </p>
        <ul>
          <li>Available on Android & iOS platforms</li>
          <li>User-friendly UI for field agents</li>
          <li>Live data sync with ERP</li>
          <li>Offline capability with auto-sync</li>
        </ul>
        <div className="media-section">
          <img src="/chitbotss.png" alt="Chitboy Screenshot" />
          <img src="/chitbotss2.png" alt="Sugar 24x7 Screenshot" />
        </div>
        <div className="app-links">
          <a href="#">Download from Play Store</a> &nbsp;|&nbsp;
          <a href="#">Download from App Store</a>
        </div>
        <img src="/erpcycle.png" alt="ERP Cycle" className="erpcycle" />
      </section>

      {/* Features Section */}
      <section className="section">
        <h2>🌐 Features</h2>
        <p>Our ERP systems offer high-end features for scalable, secure, and streamlined operations.</p>
        <ul>
          <li>Cloud Deployment</li>
          <li>Mobile ERP</li>
          <li>Secured Environment</li>
          <li>Real-time Data Synchronization</li>
          <li>Automated Reporting & Analytics</li>
          <li>Multi-Level Operations</li>
          <li>Low Software Dependency</li>
          <li>Scalability, Cost Saving & Compliance</li>
        </ul>
      </section>

      {/* Industries We Serve */}
      <section className="section">
        <img src="/millfromheight.png" alt="Sugar Mill" className="millfromheight" />
        <h2>📊 Industries We Serve</h2>
        <p>Trusted by over 40 sugar factories, we deliver tailored ERP solutions to modernize operations.</p>
        <ul>
          <li><strong>40+ Sugar Factories</strong> onboard</li>
          <li>Complete end-to-end ERP implementation</li>
          <li>Live monitoring, harvesting, and payment tracking</li>
        </ul>
        <p className="testimonials">
          “Thanks to 3WD, our factory operations are faster and more transparent.” – Client from Kolhapur
        </p>
      </section>

      {/* Account Module */}
      <section className="section accountModule">
        <h2>📘 Account Module</h2>
        <ul>
          <li>Structured Ledgers – Clean, auditable groups & ledgers</li>
          <li>Opening Balances – Seamless year-start entry management</li>
          <li>Voucher Management – Multi-level approval on entries</li>
          <li>Real-Time Reports – Trial balance, day books & more</li>
          <li>TDS & Compliance – Automated statutory reports</li>
        </ul>
      </section>

      {/* Payroll */}
      <section className="section">
        <h2>👥 Payroll Management</h2>
        <ul>
          <li>Employee Profiles – Centralized HR data</li>
          <li>Dynamic Salary Configuration – Fixed/variable pay, leave tracking</li>
          <li>Auto Salary Processing – Department-level JV support</li>
          <li>Payslips & Bank Advice – One-click salary distribution</li>
          <li>Statutory Reports – PF, TDS, ESIC & more</li>
        </ul>
      </section>

      {/* Inventory */}
      <section className="section">
        <h2>📦 Inventory Management</h2>
        <ul>
          <li>Procurement Workflow – From requisition to PO</li>
          <li>Stock Controls – Real-time GRN, material tracking</li>
          <li>Vendor Quotes & Comparisons – Secure best prices</li>
          <li>Work Orders & ARC – In-house & vendor production</li>
          <li>Inventory Analytics – Usage trends & stock alerts</li>
        </ul>
        <img src="/stockinout.png" alt="Inventory Flow" />
      </section>

      {/* Distillery */}
      <section className="section">
        <h2>🍾 Distillery Management</h2>
        <ul>
          <li>Batch-Wise Tracking – From fermentation to bottling</li>
          <li>Quality Control – Real-time lab integration</li>
          <li>Excise & Tax Automation – Full-duty/tax calculation</li>
          <li>Tank Management & Yield Analysis – Optimize output</li>
          <li>Daily Production Reports – Instant summaries</li>
        </ul>
      </section>

      {/* Sales */}
      <section className="section">
        <h2>🛒 Sales Management</h2>
        <ul>
          <li>Customer Management – Profiles & credit tracking</li>
          <li>Smart Quotations & Orders – Quick conversions</li>
          <li>GST-Compliant Invoices – Linked to dispatch</li>
          <li>Discount & Scheme Management – Regional pricing</li>
          <li>Performance Dashboards – Sales analytics</li>
        </ul>
      </section>

      {/* Purchase */}
      <section className="section">
        <h2>📥 Purchase Management</h2>
        <ul>
          <li>Vendor Profiles & RFQs – Complete evaluations</li>
          <li>Smart PO Management – Multi-level approvals</li>
          <li>GRNs & Invoices – Auto-match goods received</li>
          <li>Returns & Debit Notes – Easy exception handling</li>
          <li>Reports & Trends – Insights on spend & vendors</li>
        </ul>
      </section>

      {/* Weighbridge */}
      <section className="section">
        <h2>⚖️ Weighbridge Management</h2>
        <ul>
          <li>Auto Capture – Prevent manual errors</li>
          <li>Multi-Stage Weighing – Single & dual workflows</li>
          <li>Slip Generation – QR/barcode-based logs</li>
          <li>Integrated Security – Cameras & boom barriers</li>
          <li>Detailed Reports – Track overloads & duplications</li>
        </ul>
        <img src="/weighing.png" alt="Weighing Process" />
      </section>

      {/* Cane Management */}
      <section className="section">
        <h2>🌱 Cane Management</h2>
        <ul>
          <li>Farmer Registration & Survey – Yield mapping</li>
          <li>Indent & Pass Management – QR-based logistics</li>
          <li>Weighment & Payments – Real-time calculations</li>
          <li>Billing & Analytics – Daily to seasonal insights</li>
          <li>Quality Tracking – Sugar recovery & crop analysis</li>
        </ul>
      </section>

      {/* RFID Vehicle Tracking */}
      <section className="section">
        <h2>📡 RFID Vehicle Tracking</h2>
        <ul>
          <li>RFID Integration – Contactless vehicle tracking</li>
          <li>Live Vehicle Monitoring – Dashboards & maps</li>
          <li>Route/Village Mapping – Simplified logistics</li>
          <li>Tamper Alerts & Validation – Security enabled</li>
          <li>Comprehensive Reporting – History & exceptions</li>
        </ul>
        <img src="/numberTracking.png" alt="Vehicle RFID" />
      </section>

      {/* Clients */}
      <div className="clients-banner">
        <img src="/clientstotal42plus.png" alt="42+ Clients Banner" />
      </div>
    </div>
  );
};

export default WhatWeServe;
