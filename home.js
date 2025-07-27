import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Card } from 'react-bootstrap'; // Import necessary components
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Home() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        backgroundColor: '#42A5F5',
      },
      {
        label: 'Expenses',
        data: [],
        backgroundColor: '#FF7043',
      },
    ],
  });

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://127.0.0.1:5000/data')
      .then((response) => {
        setData(response.data);
        const labels = response.data.map(item => `Data ${item.id}`);
        const revenue = response.data.map(item => item.revenue);
        const expenses = response.data.map(item => item.expenses);

        setChartData({
          labels: labels,
          datasets: [
            { label: 'Revenue', data: revenue, backgroundColor: '#42A5F5' },
            { label: 'Expenses', data: expenses, backgroundColor: '#FF7043' },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      {/* Navbar with black background, white text */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Business Analytics</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Dashboard</Nav.Link>
          <Nav.Link href="#reports">Reports</Nav.Link>
        </Nav>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col sm={2} className="bg-light p-3">
            <h5>Sidebar</h5>
            <ul>
              <li><a href="#dashboard">Dashboard</a></li>
              <li><a href="#reports">Reports</a></li>
            </ul>
          </Col>

          {/* Main Content */}
          <Col sm={10} className="p-3">
            <h3>Dashboard</h3>
            <Row>
              {/* Card displaying total revenue */}
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Total Revenue</Card.Title>
                    <Card.Text>
                      {data.reduce((acc, item) => acc + item.revenue, 0)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Card displaying total expenses */}
              <Col sm={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Total Expenses</Card.Title>
                    <Card.Text>
                      {data.reduce((acc, item) => acc + item.expenses, 0)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* Bar chart */}
              <Col sm={12} className="mb-3">
                <Bar data={chartData} options={{ responsive: true }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
