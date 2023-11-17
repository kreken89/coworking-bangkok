'use client';

import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
        errors,
    },
    reset
} = useForm<FieldValues>({
    defaultValues: {
        categories: [],
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: [], //Ändra till array
        price: 1,
        title: '',
        description: '',
        }
    });

    const selectedCategories = watch("categories");
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import("../Map"), {
      ssr: false,
    }), [location]);


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const toggleCategory = (selectedCategory: string) => {
      const selectedCategories: string[] = watch('categories') || [];
      if (selectedCategories.includes(selectedCategory)) {
        // Category is already selected, remove it
        const updatedCategories = selectedCategories.filter(
          (category) => category !== selectedCategory
        );
        setValue('categories', updatedCategories);
      } else {
        // Category is not selected, add it
        const updatedCategories = [...selectedCategories, selectedCategory];
        setValue('categories', updatedCategories);
      }
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (step !== STEPS.PRICE) {
        return onNext();
      }

      setIsLoading(true);

      axios
        .post('/api/listings', {
          ...data,
          imageSrc,
          category: selectedCategories,
        })
        .then(() => {
          toast.success('Listing Created!');
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          rentModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }

        return "Next";
    }, [ step ]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return "Back";
    }, [ step ]);

    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your space?"
          subtitle="Pick a category"
        />
        <div
          className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-2 
                    gap-3 
                    max-h-[50vh] 
                    overflow-y-auto
                ">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={() => toggleCategory(item.label)}
                selected={selectedCategories.includes(item.label)} // Check if the category is selected
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where's your space located?"
              subtitle="Help guests find your space"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setCustomValue('location', value)}
            />
            <Map 
                center={location?.latlng}
            />
          </div>
        )
    }

    if (step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
          />
          <Counter
            title="Guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(value) => setCustomValue('guestCount', value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you have"
            value={roomCount}
            onChange={(value) => setCustomValue('roomCount', value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      );
    }

    if (step === STEPS.IMAGES) {
      bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like"
            />  
            <ImageUpload 
              value={imageSrc}
              onChange={(value) => setCustomValue('imageSrc', value)}
            />
        </div>
      )
    }

    if (step === STEPS.DESCRIPTION) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your office?"
            subtitle="Write a short description"
          />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
    }

    if (step === STEPS.PRICE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How much do you charge?"
            subtitle="Set a price for your space"
          />
          <Input
            id="price"
            label="Price"
            formatPrice={true}
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
    }

  return (
    <Modal 
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title = "Add listing"
        body={bodyContent}
    />

  )
}

export default RentModal