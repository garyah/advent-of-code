#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2018/FrequencyCalibrator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2018;

namespace advent2018tests
{
    TEST_CLASS(FrequencyCalibratorTests)
    {
    public:
        TEST_METHOD(FirstSampleReturnsCorrectFrequency)
        {
            FrequencyCalibrator calibrator;
            // +1, -2, +3, +1
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("-2");
            calibrator.changeFrequency("+3");
            calibrator.changeFrequency("+1");
            Assert::AreEqual(3, (int)calibrator.getFrequency());
        }
        TEST_METHOD(SecondSampleReturnsCorrectFrequency)
        {
            FrequencyCalibrator calibrator;
            // +1, +1, +1
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("+1");
            Assert::AreEqual(3, (int)calibrator.getFrequency());
        }
        TEST_METHOD(ThirdSampleReturnsCorrectFrequency)
        {
            FrequencyCalibrator calibrator;
            // +1, +1, -2
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("-2");
            Assert::AreEqual(0, (int)calibrator.getFrequency());
        }
        TEST_METHOD(FourthSampleReturnsCorrectFrequency)
        {
            FrequencyCalibrator calibrator;
            // -1, -2, -3
            calibrator.changeFrequency("-1");
            calibrator.changeFrequency("-2");
            calibrator.changeFrequency("-3");
            Assert::AreEqual(-6, (int)calibrator.getFrequency());
        }
    };
}
