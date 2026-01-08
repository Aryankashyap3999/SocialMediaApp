# Component Library - Atomic Design System

This folder contains all reusable UI components following **Atomic Design** principles.

## Structure

```
components/
├── atoms/              # Basic building blocks (11)
│   ├── Button.tsx      # Single button
│   ├── Input.tsx       # Single input field
│   ├── Avatar.tsx      # User profile picture
│   ├── Badge.tsx       # Status label
│   ├── Text.tsx        # Styled text
│   ├── Heading.tsx     # Semantic heading
│   ├── icons/          # SVG icons (14+)
│   └── index.ts        # Exports
│
├── molecules/          # Simple combinations (5)
│   ├── InputField.tsx  # Label + Input + Error
│   ├── Card.tsx        # Container
│   ├── UserHeader.tsx  # Avatar + Name + Badge
│   ├── PostActions.tsx # Like + Comment + Share
│   ├── LanguageTag.tsx # Language indicator
│   └── index.ts        # Exports
│
├── organisms/          # Complex components (2)
│   ├── FeedCard.tsx    # Complete post item
│   ├── CreatePostCard.tsx # Post creation
│   └── index.ts        # Exports
│
├── layouts/            # Page layouts (2)
│   ├── Main.tsx        # Header + Sidebar + Content
│   ├── Auth.tsx        # Auth page layout
│   └── index.ts        # Exports
│
└── index.ts            # Main exports
```

---

## Principles

### ✅ Single Responsibility
Each component does **ONE** thing well.

```typescript
// ❌ BAD - Button does too much
<Button onClick={save}>
  Save (this also validates, logs, and redirects)
</Button>

// ✅ GOOD - Button only renders
<Button onClick={onSave}>Save</Button>
```

### ✅ Composability
Components combine to form larger components.

```typescript
// Atom
<Avatar src="url" />

// Molecule (Atom + Atom)
<UserHeader>
  <Avatar /> + <Badge /> + <Text />
</UserHeader>

// Organism (Molecule + Molecule)
<FeedCard>
  <UserHeader /> + <PostActions />
</FeedCard>
```

### ✅ Reusability
Use components throughout the app.

```typescript
// Use Button anywhere
<Button>Login</Button>
<Button variant="outline">Cancel</Button>
<Button size="lg" disabled>Submit</Button>
```

### ✅ Type Safety
Full TypeScript support.

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

<Button variant="primary" size="lg" />
// Type error if using invalid variant
```

---

## Usage Examples

### Atoms

```typescript
import { Button, Input, Avatar, Badge, Text, Heading } from '@components';

<Button variant="primary">Click Me</Button>
<Input placeholder="Email" type="email" />
<Avatar src="url" size="lg" isVerified />
<Badge variant="success">Verified</Badge>
<Text variant="body" color="muted">Hello</Text>
<Heading level={2}>Title</Heading>
```

### Molecules

```typescript
import { InputField, Card, UserHeader, PostActions, LanguageTag } from '@components';

<InputField label="Email" required error="Invalid" />
<Card shadow="lg" padding="md">Content</Card>
<UserHeader userName="John" isVerified subtitle="@john" />
<PostActions likes={42} comments={8} onLike={handleLike} />
<LanguageTag language="hi" />
```

### Organisms

```typescript
import { FeedCard, CreatePostCard } from '@components';

<FeedCard
  id="1"
  authorName="John"
  content="Hello world!"
  likesCount={42}
  onLike={handleLike}
/>

<CreatePostCard userName="John" onClick={() => navigate('/create')} />
```

### Layouts

```typescript
import { MainLayout, AuthLayout } from '@components';

<MainLayout header={<Header />} sidebar={<Sidebar />}>
  <HomePage />
</MainLayout>

<AuthLayout>
  <LoginForm />
</AuthLayout>
```

---

## Component Reference

### Atoms

| Component | Props | Example |
|-----------|-------|---------|
| **Button** | variant, size, isLoading | `<Button variant="primary">Save</Button>` |
| **Input** | label, error, placeholder | `<Input placeholder="Email" error="Invalid" />` |
| **Avatar** | src, size, isVerified | `<Avatar src="url" size="lg" isVerified />` |
| **Badge** | variant, size, icon | `<Badge variant="success" icon="✓">Done</Badge>` |
| **Text** | variant, color, weight | `<Text color="muted">Subtitle</Text>` |
| **Heading** | level, color | `<Heading level={2}>Title</Heading>` |

### Molecules

| Component | Atoms Used | Example |
|-----------|-----------|---------|
| **InputField** | Text, Input | `<InputField label="Email" required />` |
| **Card** | (Shadow, Padding) | `<Card shadow="lg">Content</Card>` |
| **UserHeader** | Avatar, Badge, Text | `<UserHeader userName="John" isVerified />` |
| **PostActions** | Button, Icons | `<PostActions likes={42} onLike={...} />` |
| **LanguageTag** | Badge | `<LanguageTag language="hi" />` |

### Organisms

| Component | Molecules Used | Example |
|-----------|--------------|---------|
| **FeedCard** | UserHeader, Card, PostActions | `<FeedCard authorName="John" content="..." />` |
| **CreatePostCard** | UserHeader, Card, Button | `<CreatePostCard userName="John" />` |

### Layouts

| Component | Purpose | Example |
|-----------|---------|---------|
| **MainLayout** | Page with header/sidebar | `<MainLayout header={...} sidebar={...}>` |
| **AuthLayout** | Auth page centered | `<AuthLayout><LoginForm /></AuthLayout>` |

---

## Creating New Components

### Atom Template
```typescript
import React from 'react';

interface MyAtomProps {
  // Props
}

export const MyAtom: React.FC<MyAtomProps> = ({ }) => {
  return <div>Component</div>;
};

MyAtom.displayName = 'MyAtom';
```

### Molecule Template
```typescript
import React from 'react';
import { Atom1, Atom2 } from '@components/atoms';

interface MyMoleculeProps {
  // Props
}

/**
 * MyMolecule
 * 
 * Combines: Atom1 + Atom2
 * Single responsibility: ...
 */
export const MyMolecule: React.FC<MyMoleculeProps> = ({ }) => {
  return (
    <div>
      <Atom1 />
      <Atom2 />
    </div>
  );
};

MyMolecule.displayName = 'MyMolecule';
```

### Organism Template
```typescript
import React from 'react';
import { Molecule1, Molecule2 } from '@components/molecules';

interface MyOrganismProps {
  // Props
}

/**
 * MyOrganism
 * 
 * Combines: Molecule1 + Molecule2
 * Single responsibility: ...
 */
export const MyOrganism: React.FC<MyOrganismProps> = ({ }) => {
  return (
    <div>
      <Molecule1 />
      <Molecule2 />
    </div>
  );
};

MyOrganism.displayName = 'MyOrganism';
```

---

## Best Practices

✅ **Do:**
- Keep components focused (single responsibility)
- Use TypeScript interfaces for all props
- Export types along with components
- Write JSDoc comments
- Use forwardRef for form elements
- Keep styling in className/tailwind
- Use composition instead of props drilling

❌ **Don't:**
- Mix logic with presentation
- Create prop-drilling chains
- Override component styles from parent
- Create mega-components
- Mix atoms with molecules in atoms
- Hardcode business logic
- Use inline styles for theming

---

## Styling

All components use **Tailwind CSS** classes.

### Colors
```typescript
// Using CSS variables
color: 'text-primary'      // Main text color
color: 'text-secondary'    // Secondary text
color: 'text-error'        // Error state
color: 'bg-primary'        // Primary background
```

### Spacing
```typescript
// Using CSS variables
p-3      // Small padding
p-4      // Medium padding
gap-2    // Small gap
gap-4    // Medium gap
```

### Variants
```typescript
// Button variants
variant="primary"      // Main action
variant="outline"      // Secondary action
variant="ghost"        // Minimal
variant="danger"       // Destructive

// Sizes
size="sm"             // Small
size="md"             // Medium
size="lg"             // Large
```

---

## Testing

Each component should have simple usage examples in JSDoc.

```typescript
/**
 * @example
 * <MyComponent prop="value" />
 * 
 * @example
 * <MyComponent prop="value" variant="outline" />
 */
```

---

## Performance

- ✅ Use React.memo for expensive components
- ✅ Use React.forwardRef for form elements
- ✅ Memoize callbacks with useCallback
- ✅ Avoid prop-drilling (use composition)
- ✅ Keep components small and focused

---

## Accessibility

All components follow WCAG guidelines:

- ✅ Semantic HTML (button, input, heading)
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Color contrast ratios

---

## Component Count

| Level | Count | Purpose |
|-------|-------|---------|
| Atoms | 11 | Basic building blocks |
| Icons | 14+ | SVG icons |
| Molecules | 5 | Simple combinations |
| Organisms | 2 | Complex features |
| Layouts | 2 | Page structure |
| **Total** | **35+** | Complete library |

---

## Next Steps

Phase 3 will add:
- More atoms (Divider, Spinner, Toast, Modal)
- More molecules (Select, Textarea, Checkbox, Radio)
- More organisms (LoginForm, SignupForm, HomePage)
- Feature-specific components (PostForm, ChatMessage, UserCard)

---

**Last Updated**: 2026-01-08
**Maintainer**: Development Team
