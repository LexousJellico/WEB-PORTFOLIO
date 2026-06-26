const circuitNodes = [
  { left: "9%", top: "18%", delay: "0s" },
  { left: "19%", top: "67%", delay: "-1.2s" },
  { left: "32%", top: "38%", delay: "-2.1s" },
  { left: "46%", top: "74%", delay: "-0.7s" },
  { left: "58%", top: "22%", delay: "-2.8s" },
  { left: "72%", top: "54%", delay: "-1.7s" },
  { left: "84%", top: "29%", delay: "-3.4s" },
  { left: "91%", top: "78%", delay: "-0.3s" },
];

const CircuitBackdrop = () => {
  return (
    <div className="circuit-backdrop absolute inset-0" aria-hidden="true">
      <div className="circuit-vignette" />
      <div className="circuit-core-ring circuit-core-ring-red" />
      <div className="circuit-core-ring circuit-core-ring-blue" />
      <span className="circuit-route circuit-route-one" />
      <span className="circuit-route circuit-route-two" />
      <span className="circuit-route circuit-route-three" />
      <span className="circuit-route circuit-route-four" />
      <span className="data-packet data-packet-one" />
      <span className="data-packet data-packet-two" />
      <span className="data-packet data-packet-three" />
      <span className="data-packet data-packet-four" />
      {circuitNodes.map((node, index) => (
        <span
          className="circuit-node"
          key={`${node.left}-${node.top}`}
          style={{ left: node.left, top: node.top, animationDelay: node.delay }}
        >
          <span className="sr-only">Interface node {index + 1}</span>
        </span>
      ))}
    </div>
  );
};

export default CircuitBackdrop;
