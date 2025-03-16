import React, { useState, useEffect } from "react";
import { Layout, Skeleton, Row, Col, Card, Divider } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/global/Header";
import SideNavBar from "../components/global/Sidenav";

const { Content } = Layout;

const SecondaryLayout = ({ setLoading }) => {
  const location = useLocation();
  const [loading, setInternalLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    setInternalLoading(true);
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleSidebarCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SideNavBar
        currentPath={location.pathname}
        onCollapseChange={handleSidebarCollapse}
      />

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: isSidebarCollapsed ? 50 : 250,
          transition: "margin-left 0.2s ease",
        }}
      >
        {/* Fixed Header */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: isSidebarCollapsed ? 50 : 250,
            right: 0,
            zIndex: 1000,

            transition: "left 0.2s ease",
          }}
        >
         <Header setLoading={setLoading} currentPath={location.pathname} />
        </div>

        {/* Content Area */}
        <Content
          style={{
            marginTop: 70,
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {loading ? (
            <div>
              {/* Loading Skeleton */}
              <Card style={{ borderRadius: 8, marginBottom: 20 }}>
                <Row justify="space-between" align="middle">
                  <Col span={16}>
                    <Skeleton
                      active
                      title={{ width: "60%" }}
                      paragraph={{
                        rows: 3,
                        width: ["100%", "80%", "60%"],
                      }}
                    />
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <Skeleton.Button
                      style={{ width: 120, height: 40 }}
                      active
                    />
                  </Col>
                </Row>
              </Card>

              <Card style={{ borderRadius: 8, marginBottom: 20 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Skeleton.Input
                      style={{ width: "100%", height: 40 }}
                      active
                    />
                  </Col>
                  <Col span={8}>
                    <Skeleton.Input
                      style={{ width: "100%", height: 40 }}
                      active
                    />
                  </Col>
                  <Col span={8}>
                    <Skeleton.Button
                      style={{ width: "100%", height: 40 }}
                      active
                    />
                  </Col>
                </Row>
              </Card>

              <Card style={{ borderRadius: 8 }}>
                <Skeleton active paragraph={{ rows: 1 }} />
                <Divider style={{ margin: "10px 0" }} />
                {Array.from({ length: 5 }).map((_, index) => (
                  <Row
                    key={index}
                    gutter={16}
                    align="middle"
                    style={{ marginBottom: 16 }}
                  >
                    <Col span={6}>
                      <Skeleton.Input
                        style={{ width: "100%", height: 20 }}
                        active
                      />
                    </Col>
                    <Col span={4}>
                      <Skeleton.Input
                        style={{ width: "100%", height: 20 }}
                        active
                      />
                    </Col>
                    <Col span={4}>
                      <Skeleton.Input
                        style={{ width: "100%", height: 20 }}
                        active
                      />
                    </Col>
                    <Col span={4}>
                      <Skeleton.Input
                        style={{ width: "100%", height: 20 }}
                        active
                      />
                    </Col>
                    <Col span={4}>
                      <Skeleton.Button
                        style={{ width: "100%", height: 20 }}
                        active
                      />
                    </Col>
                    <Col span={2}>
                      <Skeleton.Button
                        style={{ width: "100%", height: 20 }}
                        active
                      />
                    </Col>
                  </Row>
                ))}
              </Card>
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SecondaryLayout;
