// import { create } from 'zustand';

// type RefType = {
//   current: HTMLElement| null;
// };

// interface ScrollAnimationState {
//   scrollProgress: number;
//   heroRef: RefType | null;
//   triggerRef: RefType | null;
//   setScrollProgress: (progress: number) => void;
//   setHeroRef: (ref: RefType) => void;
//   setTriggerRef: (ref: RefType) => void;
// }

// const useScrollAnimationStore = create<ScrollAnimationState>((set) => ({
//     scrollProgress: 0,
//     heroRef: null,
//     triggerRef: null,
//     setScrollProgress: (progress) => set({ scrollProgress: progress }),
//     setHeroRef: (element) => {
//       console.log('Setting heroRef in store:', element.current);
//       set({ heroRef: element });
//     },
//     setTriggerRef: (element) => {
//       console.log('Setting triggerRef in store:', element.current);
//       set({ triggerRef: element });
//     }
//   }));

// export default useScrollAnimationStore;