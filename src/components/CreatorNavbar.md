# CreatorNavbar Component

A premium glassmorphic navigation bar specifically designed for creator pages in the PEEPZ app.

## Features

### 🎨 Visual Design
- **Glassmorphic Style**: Semi-transparent background with backdrop blur
- **Premium Aesthetics**: Orange/purple gradient accents with glowing effects
- **Responsive Design**: Mobile-first with adaptive layouts
- **Smooth Animations**: Framer Motion powered transitions

### 🧭 Navigation Tabs (6 total)
1. **Home** (`/creator`) - Creator dashboard
2. **Analytics** (`/creator/analytics`) - Creator statistics
3. **Create** (Floating button) - Upload new drops (`/creator/upload`)
4. **Inbox** (`/creator/inbox`) - Messages with notification badge
5. **Profile** (`/creator/profile`) - Creator profile management
6. **Revenue** (`/creator/referrals`) - Revenue and referrals

### ⚡ Interactive Elements
- **Floating Create Button**: Centered, elevated with gradient background
- **Active Tab Highlighting**: Orange accent color with glow effects
- **Hover Animations**: Scale and color transitions
- **Click Animations**: Ripple effects and scale feedback
- **Notification Badges**: Red badges for unread messages

### 📱 Responsive Features
- **Mobile Optimized**: Compact layout on small screens
- **Adaptive Spacing**: Responsive padding and margins
- **Icon Scaling**: Smaller icons on mobile, larger on desktop
- **Label Visibility**: Labels hidden on mobile, visible on desktop

## Usage

```tsx
import CreatorNavbar from "@/components/CreatorNavbar";

// In your creator page component
export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Your page content */}
      
      {/* Add the navbar at the bottom */}
      <CreatorNavbar />
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS classes and follows the app's design system:
- **Background**: `bg-[#ffffff0a]` with `backdrop-blur-lg`
- **Borders**: `border-white/10` for subtle glassmorphism
- **Colors**: Orange (`#FF9900`) and Purple (`#8A00D4`) gradients
- **Typography**: Inter font family with proper weight hierarchy

## Animation Details

- **Entrance**: Spring animation from bottom with opacity fade
- **Tab Switching**: Smooth color and scale transitions
- **Floating Button**: Enhanced hover effects with shadow glow
- **Active States**: Pulsing glow animation for active tabs
- **Badge Animations**: Scale animations for notification badges

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Touch-friendly interactions for mobile devices 