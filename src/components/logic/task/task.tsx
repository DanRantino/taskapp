import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TaskForm from './task-form';

type Props = {
  id: string;
};

function Task({ id }: Props) {
  return (
    <Accordion type="single" collapsible className="w-3/4">
      <AccordionItem value="item-1">
        <AccordionTrigger>Task</AccordionTrigger>
        <AccordionContent>
          <TaskForm id={id} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Task;
