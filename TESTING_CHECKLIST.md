# Manual Testing Checklist

## Backend Testing
- [ ] Run: \
ode backend/init-db.js\ (initialize database)
- [ ] Run: \
ode backend/server.js\ (start backend on port 5000)
- [ ] Run: \
ode backend/test-api.js\ (run API tests)

## Frontend Testing
- [ ] Run: \cd frontend && npm run dev\ (start on port 3000)
- [ ] Open browser: http://localhost:3000

## Feature Testing
- [ ] Dashboard loads with all tasks
- [ ] Filter buttons work (All/Pending/In Progress/Completed)
- [ ] Click 'Add New Task' button
- [ ] Form validation works
- [ ] Create a task successfully
- [ ] Task appears on dashboard
- [ ] Click 'Complete' button on a task
- [ ] Task status changes
- [ ] Task moves to Completed filter
- [ ] Click 'Delete' button
- [ ] Confirmation dialog appears
- [ ] Task is removed after confirmation
- [ ] Empty state appears when no tasks
- [ ] Loading spinner appears when fetching

## Validation Testing
- [ ] Submit form with empty title (should show error)
- [ ] Submit form with description < 20 chars (should show error)
- [ ] Submit valid form (should create task)
- [ ] Character counters update as you type

## Responsive Design
- [ ] Open DevTools (F12)
- [ ] Test mobile view (375px width)
- [ ] Test tablet view (768px width)
- [ ] Test desktop view (1024px width)
- [ ] All elements should be visible and properly aligned

## Error Handling
- [ ] Try filtering by status (should work)
- [ ] Stop backend server
- [ ] Try to create a task (should show error)
- [ ] Restart backend server
- [ ] Refresh page
- [ ] Everything should work again

## Browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Edge
- [ ] Test on mobile browser

## Final Verification
- [ ] All 5 problem statement features work
  - [ ] View all tasks ?
  - [ ] Create new task ?
  - [ ] Mark task as completed ?
  - [ ] Delete task ?
  - [ ] Filter tasks by status ?
- [ ] No console errors
- [ ] No unhandled exceptions
- [ ] Professional UI appearance
- [ ] Responsive on all screen sizes
