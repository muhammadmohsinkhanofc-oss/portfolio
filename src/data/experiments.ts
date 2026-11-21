export type LabExperimentType =
  | '3d-form'
  | 'kinetic-type'
  | 'moire-canvas'
  | 'poster-study'
  | 'visual-grid'
  | 'motion-frame';

export interface LabExperiment {
  id: string;
  index: string;
  title: string;
  discipline: string;
  caption: string;
  type: LabExperimentType;
}

export const MAD_LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-01',
    index: '01',
    title: 'LIQUID CHROME TOROID',
    discipline: '3D EXPERIMENTS',
    caption: 'Procedural metallic surface study.',
    type: '3d-form',
  },
  {
    id: 'exp-02',
    index: '02',
    title: 'KINETIC MONOGRAPH',
    discipline: 'EXPERIMENTAL TYPOGRAPHY',
    caption: 'Pointer-reactive editorial type specimen.',
    type: 'kinetic-type',
  },
  {
    id: 'exp-03',
    index: '03',
    title: 'INTERFERENCE FIELD',
    discipline: 'ABSTRACT COMPOSITIONS',
    caption: 'Generative monochrome wave field.',
    type: 'moire-canvas',
  },
  {
    id: 'exp-04',
    index: '04',
    title: 'NOIR EXHIBITION PLATE',
    discipline: 'POSTER STUDIES',
    caption: 'High-contrast Swiss architectural poster.',
    type: 'poster-study',
  },
  {
    id: 'exp-05',
    index: '05',
    title: 'OPTICAL APERTURE',
    discipline: 'VISUAL EXPERIMENTS',
    caption: 'Interactive geometric rhythm matrix.',
    type: 'visual-grid',
  },
  {
    id: 'exp-06',
    index: '06',
    title: 'TEMPORAL CADENCE',
    discipline: 'MOTION DESIGN',
    caption: 'Synchronized monochrome kinetic bars.',
    type: 'motion-frame',
  },
];
