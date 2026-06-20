import './EmptyState.css';

export default function EmptyState() {
  return (
    <div className=\"empty-state\">
      <div className=\"empty-icon\">??</div>
      <h2>No tasks yet</h2>
      <p>Create your first task to get started!</p>
    </div>
  );
}
