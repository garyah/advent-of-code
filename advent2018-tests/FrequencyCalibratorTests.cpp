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

        TEST_METHOD(FirstSampleReturnsCorrectFirstRepeatedFrequency)
        {
            FrequencyCalibrator calibrator(true);
            // +1, -2, +3, +1
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("-2");
            calibrator.changeFrequency("+3");
            calibrator.changeFrequency("+1");
            Assert::AreEqual(2, (int)calibrator.firstRepeatedFrequency());
        }

        TEST_METHOD(PartTwoSecondSampleReturnsCorrectFirstRepeatedFrequency)
        {
            FrequencyCalibrator calibrator(true);
            // +1, -1
            calibrator.changeFrequency("+1");
            calibrator.changeFrequency("-1");
            Assert::AreEqual(0, (int)calibrator.firstRepeatedFrequency());
        }

        TEST_METHOD(PartTwoThirdSampleReturnsCorrectFirstRepeatedFrequency)
        {
            FrequencyCalibrator calibrator(true);
            // +3, +3, +4, -2, -4
            calibrator.changeFrequency("+3");
            calibrator.changeFrequency("+3");
            calibrator.changeFrequency("+4");
            calibrator.changeFrequency("-2");
            calibrator.changeFrequency("-4");
            Assert::AreEqual(10, (int)calibrator.firstRepeatedFrequency());
        }

        TEST_METHOD(PartTwoFourthSampleReturnsCorrectFirstRepeatedFrequency)
        {
            FrequencyCalibrator calibrator(true);
            // -6, +3, +8, +5, -6
            calibrator.changeFrequency("-6");
            calibrator.changeFrequency("+3");
            calibrator.changeFrequency("+8");
            calibrator.changeFrequency("+5");
            calibrator.changeFrequency("-6");
            Assert::AreEqual(5, (int)calibrator.firstRepeatedFrequency());
        }

        TEST_METHOD(PartTwoFifthSampleReturnsCorrectFirstRepeatedFrequency)
        {
            FrequencyCalibrator calibrator(true);
            // +7, +7, -2, -7, -4
            calibrator.changeFrequency("+7");
            calibrator.changeFrequency("+7");
            calibrator.changeFrequency("-2");
            calibrator.changeFrequency("-7");
            calibrator.changeFrequency("-4");
            Assert::AreEqual(14, (int)calibrator.firstRepeatedFrequency());
        }
    };
}
